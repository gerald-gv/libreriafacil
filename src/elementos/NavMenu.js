import React, { useContext } from "react";
import { UsuarioContext } from "../usuario/UsuarioContext";
import { Link, useNavigate } from "react-router-dom";
import '../estilos/principal.css'
import Menu from "../imagenes/menu.png";

const NavMenu = () => {
    //Utiliza lo puesto en el UsuarioContext.js
    const {usuario, setUsuario} =useContext(UsuarioContext)
    const Navegar = useNavigate();
    
    const handleLogout = () =>{
        localStorage.removeItem("usuario") // remueve el item usuario y se borra el usuario permanente 
        setUsuario(null);
        Navegar("/")
    }

    return(
        <header className="menu">
            <Link to="/" className="logo">
                {usuario ? `Bienvenido, ${usuario.nombre}` : "Librería Fácil"}
            </Link>
            <input type="checkbox" id="menu"/>
            <label htmlFor="menu">
                <img src={Menu} className="menu-icon" alt="Menu"/>
            </label>
            <nav className="navBar">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/servicios">Servicios</Link></li>
                    <li><Link to="/">Libros</Link></li>
                    <li>
                        {/*Verifica si hay usuario, si hay usuario logueado, aparece boton de cerrar sesion*/}
                        {usuario ? (
                            <Link onClick={handleLogout}>Cerrar Sesion</Link>
                        ):(
                            <Link to="/iniciar-sesion">Iniciar Sesion</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>  
    );
}

export default NavMenu;

