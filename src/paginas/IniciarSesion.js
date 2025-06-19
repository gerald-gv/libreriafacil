import React, { useContext, useState } from "react";
import { UsuarioContext } from "../usuario/UsuarioContext";
import { useNavigate, Link } from "react-router-dom";
import "../estilos/formularios.css";

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const { setUsuario } = useContext(UsuarioContext);
  const Navegar = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioRegistrado) {
      setError("Usuario no registrado");
      return;
    }

    if (
      formData.email !== usuarioRegistrado.email ||
      formData.contraseña !== usuarioRegistrado.contraseña
    ) {
      setError("Correo y/o contraseña incorrectos");
      return;
    }

    setError("");
    setUsuario(usuarioRegistrado);
    alert("Inicio de sesión confirmada");
    Navegar("/");
  };

  return (
    <div>
        
        <main>
          <section>
            <div className="font-content-form">
              <div className="content-form">
                <h1>Inicio de sesión</h1>
                <form onSubmit={handleSubmit}>

                  <label for="Email" className="title-input-name">Correo electrónico <span>*</span></label>
                  <input type="email" name="email" onChange={handleChange} class="input-container" required/>

                  <label for="password" className="title-input-name">Contraseña <span>*</span></label>
                  <input type="password" name="contraseña" onChange={handleChange} class="input-container" required/>
                  <Link to="/recuperar-cuenta" className="forgot-password">¿Olvidaste tu contraseña?</Link>
                  
                  <div className="submit">
                    {error && <p className="error_contra">{error}</p>}
                    <input type="submit" value="Iniciar sesion"/>
                    <p>¿Aun no estas registrado?</p>
                    <Link to="/registrate" className="second-button">Crear cuenta</Link>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
    </div>
  )
}

export default IniciarSesion

