import { useContext, useState } from "react";
import { UsuarioContext } from "../usuario/UsuarioContext";
import { useNavigate } from "react-router-dom";
import "../estilos/formularios.css"
const Registrate = () => {

  // Establecer el estado
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    confirmarContraseña: ""
  })
  // Estado de error
  const [error, setError] = useState("");


  // Acceso al contexto
  const { setUsuario } = useContext(UsuarioContext);

  const Navegar = useNavigate();

  // Verificar lo que se puso en los inputs
  const handleChange = (e) => {
    // Desestructuracion para los atributos name y value
    const { name, value } = e.target; // e.target extraera los atributos name y value
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const API_URL = process.env.REACT_APP_API_URL;
  // Para verificar si todo esta bien al momento de subirlo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden")
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.nombre,
          email: formData.email,
          password: formData.contraseña
        }),
      });

      const data = await respuesta.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      //Mantener la persistencia con localStorage
      localStorage.setItem("usuario", JSON.stringify(data.user));
      setUsuario(data.user);
      alert("Te has registrado correctamente");
      Navegar("/")
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error de conexión");
    }
  };


  return (
    <div>
      <main>
        <section>
          <div className="font-content-form">
            <div className="content-form">
              <h1>Registro</h1>
              <form className="register" onSubmit={handleSubmit}>
                <label htmlFor="Nombre" className="title-input-name">Nombre de usuario <span>*</span></label>
                <input type="text"
                  name="nombre"
                  onChange={handleChange}
                  className="input-container"
                  required />

                <label htmlFor="Email" className="title-input-name">Correo electrónico <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="input-container"
                  required />

                <label htmlFor="new-password" className="title-input-name">Contraseña <span>*</span></label>
                <input
                  type="password"
                  name="contraseña"
                  onChange={handleChange}
                  className="input-container"
                  required />

                <label htmlFor="password" className="title-input-name">Confirmar contraseña <span>*</span></label>
                <input
                  type="password"
                  name="confirmarContraseña"
                  onChange={handleChange}
                  className="input-container"
                  required />

                <div className="submit">
                  {error && <p className="error_contra">{error}</p>}
                  <input type="submit" value="Crear cuenta" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Registrate

