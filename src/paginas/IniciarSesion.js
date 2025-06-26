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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.contraseña,
        }),
      });

      const data = await respuesta.json();

      if (data.error) {
        setError("Correo y/o contraseña incorrectos");
        return;
      }
      // Establecer usuario para localStorage, persistencia completada
      localStorage.setItem("usuario", JSON.stringify(data.user));
      setUsuario(data.user);

      if (data.user.email === "admin@correo.com") {
        alert("Bienvenido, administrador");
        Navegar("/reporte-ventas");
      } else {
        alert("Inicio de sesión exitoso");
        Navegar("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error de conexión");
    }
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
                <input type="email" name="email" onChange={handleChange} class="input-container" required />

                <label for="password" className="title-input-name">Contraseña <span>*</span></label>
                <input type="password" name="contraseña" onChange={handleChange} class="input-container" required />
                <Link to="/recuperar-cuenta" className="forgot-password">¿Olvidaste tu contraseña?</Link>

                <div className="submit">
                  {error && <p className="error_contra">{error}</p>}
                  <input type="submit" value="Iniciar sesion" />
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

