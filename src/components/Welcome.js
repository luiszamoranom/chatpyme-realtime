import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./welcome.css";
import TodoSVG from '../assets/todo-svg.svg';
import { set, ref } from "firebase/database";
import { db } from "../firebase.js";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleNavigate = () => {
    navigate("/medicos");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    console.log("se loguea");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (email.endsWith('@medicos.cl')) {
          // Si es un correo de médico, redirigir a la vista /medico
          console.log("redirigio a medico");
          navigate("/medicos"); // Aquí corregí la ruta a "/medicos"
        } 
        if(email.endsWith('@auxiliares.cl')) {
          console.log("redirigio a auxiliares");
          navigate("/auxiliares");
        }
        if(email.endsWith('@examenes.cl')) {
          console.log("redirigio a examenes");
          navigate("/examenes");
        }
        if(email.endsWith('@admision.cl')) {
          console.log("redirigio a admision");
          navigate("/admision");
        }
        if(email.endsWith('@pabellon.cl')) {
          console.log("redirigio a pabellon");
          navigate("/pabellon");
        }
        if(email.endsWith('@admin.cl')) {
          console.log("redirigio a admin");
          navigate("/admin");
        }
        else {
          console.log("redirigio a homepage");
          // De lo contrario, redirigir a la vista /homepage
          navigate("/homepage");
        }
      })
      .catch((err) => alert(err.message));
  };
  

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        set(ref(db, 'users/' + userId), {
          email: registerInformation.email,
          role: registerInformation.role
        });
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="welcome">
      <img src={TodoSVG} className="todo-svg" alt="Todo List" />
      <h1>Todo-List</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value
                })
              }
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value
                })
              }
            />
            <select
              value={registerInformation.role}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  role: e.target.value
                })
              }
            >
              <option value="">Selecciona un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Medico">Médico</option>
              <option value="Auxiliar">Auxiliar</option>
              <option value="Examenes">Exámenes</option>
              <option value="Admisión">Admisión</option>
              <option value="Pabellón">Pabellón</option>
            </select>
            <button className="sign-in-register-button" onClick={handleRegister}>
              Register
            </button>
            <button
              className="create-account-button"
              onClick={() => setIsRegistering(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
            />
            <button className="sign-in-register-button" onClick={handleSignIn}>
              Sign In
            </button>
            <button
              className="create-account-button"
              onClick={() => setIsRegistering(true)}
            >
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
