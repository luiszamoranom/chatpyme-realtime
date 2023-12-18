import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./medicos.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
//import config icon
import { Settings } from '@mui/icons-material';

const Medicos = () => {
  const [todo, setTodo] = useState("");
  const [mensaje_medicos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/mensaje_medicos`), (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            const sortedTodos = Object.values(data).sort((b,a) => b.timestamp - a.timestamp);
            setTodos(sortedTodos);
          } else {
            setTodos([]);
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const getUsernameFromEmail = (email) => {
    return email.split('@')[0];
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const writeToDatabase = () => {
    const uidd = uid();
    const userEmail = auth.currentUser.email;
    const username = getUsernameFromEmail(userEmail);
    const timestamp = Date.now();
    set(ref(db, `/mensaje_medicos/${uidd}`), {
      todo: `${username}: ${todo}`,
      uidd: uidd,
      timestamp: timestamp
    });

    setTodo("");
  };

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleIrMedicos = () => {
    navigate("/medicos");
  };

  const handleEditConfirm = () => {
    const userEmail = auth.currentUser.email;
    const username = getUsernameFromEmail(userEmail);
    const timestamp = Date.now();
    update(ref(db, `/mensaje_medicos/${tempUidd}`), {
      todo: `${username}: ${todo}`,
      timestamp: timestamp
    });

    setTodo("");
    setIsEdit(false);
  };

  const handleDelete = (uid) => {
    remove(ref(db, `/mensaje_medicos/${uid}`));
  };

  const handleConfigClick = () => {
    setShowIcons(!showIcons);
  }

  return (
    <div className="chat-container">
      <div className="navbar">
        <h2>Canales</h2>
        <ul>
          
        </ul>
      </div>

      <div className="chat">
        <div className="chat-header">
          <h2>Chat</h2>
          <Settings onClick={handleConfigClick} className="config-icon" />
        </div>

        <div className="messages">
          {mensaje_medicos.map((todo) => (
            <div key={todo.uidd} className="message">
              {formatTimestamp(todo.timestamp)} - {todo.todo}
              {showIcons && (
                <>
                  <EditIcon
                    fontSize="small"
                    onClick={() => handleUpdate(todo)}
                    className="edit-button"
                  />
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => handleDelete(todo.uidd)}
                    className="delete-button"
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="input-box">
  <input
    type="text"
    placeholder={isEdit ? "Editar mensaje..." : "Nuevo mensaje..."}
    value={todo}
    onChange={(e) => setTodo(e.target.value)}
  />
  <CheckIcon
    onClick={() => (isEdit ? handleEditConfirm() : writeToDatabase())}
    className={isEdit ? "edit-confirm-icon" : "edit-confirm-icon"}
  />
  <LogoutIcon onClick={handleSignOut} className="logout-icon" />
</div>

      </div>
    </div>
  );
};

export default Medicos;
