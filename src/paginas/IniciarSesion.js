import React, { useContext, useState } from "react";
import { UsuarioContext } from "../usuario/UsuarioContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../estilos/formularios.css";

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const { setUsuario } = useContext(UsuarioContext);
  const Navegar = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const API_URL = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const respuesta = await fetch(`${API_URL}/api/auth/local`, {
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
      // Establecer usuario para localStorage, persistencia completada'
      const usuarioCompleto = { ...data.user, jwt: data.jwt };
      localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
      setUsuario(usuarioCompleto);


      Swal.fire({
        icon: 'success',
        title: 'Login exitoso',
        text: `Te haz Logueado Exitosamente, Bienvenido ${data.user.username}`,
        confirmButtonText: 'OK'
      });

      const esAdmin = data.user.email === "admin@gmail.com";

      Navegar(esAdmin ? "/reporte-ventas" : "/");
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

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

                <div className="submit">
                  {error && <p className="error_contra">{error}</p>}
                  <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                  </button>
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

