import React from "react";
import '../estilos/principal.css'
import Menu from "../imagenes/menu.png";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return(
        <header className="menu">
            <Link to="/" className="logo">Libreria Facil</Link>
            <input type="checkbox" id="menu"/>
            <label htmlFor="menu">
                <img src={Menu} className="menu-icon" alt="Menu"/>
            </label>
            <nav className="navBar">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/servicios">Servicios</Link></li>
                    <li><Link to="/">Libros</Link></li>
                    <li><Link to="/iniciar-sesion">Iniciar Sesion</Link></li>
                </ul>
            </nav>
        </header>  
    );
}

export default NavMenu;

