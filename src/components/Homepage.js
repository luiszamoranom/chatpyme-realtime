import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./homepage.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';

export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [mensaje_general, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/mensaje_general`), (snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            const sortedTodos = Object.values(data).sort((b,a) => b.timestamp - a.timestamp); // Ordena las tareas por marca de tiempo
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
    return date.toLocaleTimeString(); // O usa otro formato que prefieras
  };

  const getUsernameFromEmail = (email) => {
    return email.split('@')[0]; // Divide el correo electrónico en el '@' y toma la primera parte
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

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    const userEmail = auth.currentUser.email;
    const username = getUsernameFromEmail(userEmail);
    const timestamp = Date.now(); // Obtener la marca de tiempo actual
    set(ref(db, `/mensaje_general/${uidd}`), {
      todo: `${username}: ${todo}`,
      uidd: uidd,
      timestamp: timestamp // Añadir la marca de tiempo
    });
  
    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleIrAdmin = () => {
    navigate("/admin");
  };

  const handleIrMedicos = () => {
    navigate("/medicos");
  };

  const handleIrAuxiliares = () => {
    navigate("/auxiliares");
  };
  const handleIrAdmision = () => {
    navigate("/admision");
  };
  const handleIrPabellon = () => {
    navigate("/pabellon");
  };
  const handleIrExamenes = () => {
    navigate("/examenes");
  };

  const handleEditConfirm = () => {
    const userEmail = auth.currentUser.email;
    const username = getUsernameFromEmail(userEmail);
    const timestamp = Date.now();
    update(ref(db, `/mensaje_general/${tempUidd}`), {
      todo: `${username}: ${todo}`,
      timestamp: timestamp
    });
  
    setTodo("");
    setIsEdit(false);
  };
  

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/mensaje_general/${uid}`));
  };

  return (
    <div>
      <div className="barra">
        <input
          className="add-edit-input"
          type="text"
          placeholder="Add todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />


      <button  onClick={handleIrAdmin}>
        Chat Admin
      </button>

      <button  onClick={handleIrMedicos}>
        Chat Medicos
      </button>

      <button  onClick={handleIrAuxiliares}>
        Chat Auxiliares
      </button>
      <button  onClick={handleIrAdmision}>
        Chat Admision
      </button>
      <button  onClick={handleIrExamenes}>
        Chat Examenes
      </button>
      <button  onClick={handleIrPabellon}>
        Chat Pabellon
      </button>
s

        <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
      </div>
      
      <div className="homepage">
      {mensaje_general.map((todo) => (
        <div className="todo">
          <h1>{formatTimestamp(todo.timestamp)} - {todo.todo}</h1>
          <EditIcon
            fontSize="large"
            onClick={() => handleUpdate(todo)}
            className="edit-button"
          />
          <DeleteIcon
            fontSize="large"
            onClick={() => handleDelete(todo.uidd)}
            className="delete-button"
          />
        </div>
      ))}

    
    </div>
    </div>
  );
}
