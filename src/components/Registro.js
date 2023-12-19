import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { set, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./registro.css"; // Importa el nuevo archivo de estilos para el formulario de registro

const Registro = () => {
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that emails are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that passwords are the same");
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
          role: registerInformation.role,
        });
        alert("se registró exitosamente")
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="registro-usuario-container">
      <h1>Registro Usuario</h1>
      <div className="registro-usuario-form">
        <input
          type="email"
          placeholder="Email"
          value={registerInformation.email}
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              email: e.target.value,
            })
          }
        />
        <input
          type="email"
          placeholder="Confirmar Email"
          value={registerInformation.confirmEmail}
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              confirmEmail: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={registerInformation.password}
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              password: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={registerInformation.confirmPassword}
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              confirmPassword: e.target.value,
            })
          }
        />
        <button className="admin-view-button" onClick={handleAdmin}>
          Volver a la vista de administrador
        </button>
        <button className="sign-in-register-button" onClick={handleRegister}>
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Registro;
