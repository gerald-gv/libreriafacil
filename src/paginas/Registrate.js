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
  const { setUsuario, usuariosBD, setUsuariosBD } = useContext(UsuarioContext);

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

  // Para verificar si todo esta bien al momento de subirlo
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden")
      return;
    }

    // Validar si ya existe el usuario
    const usuarioExiste = usuariosBD.some(u => u.email === formData.email);
    if (usuarioExiste) {
      setError("El correo ya esta registrado");
      return;
    }
    // Crear nuevo usuario
    const nuevoUsuario = {
      nombre: formData.nombre,
      email: formData.email,
      contraseña: formData.contraseña
    };


    //Revisa si ya hay usuarios nuevos, si no hay, devuelve null y pasa al siguiente
    const nuevosUsuarios = [...(JSON.parse(localStorage.getItem("usuarios")) || []), nuevoUsuario];
    //Si ya hay nuevos registrados lo guardara en usuarios
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    //Guarda el registro actual en usuario y se sabe quien esta logueado
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

    // Registro confirmado y trasladado a iniciar sesion
    setUsuariosBD(prev => [...prev, nuevoUsuario]);
    setUsuario(nuevoUsuario);

    alert("Te has registrado correctamente");
    Navegar("/");
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

