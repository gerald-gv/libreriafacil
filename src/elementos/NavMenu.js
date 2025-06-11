import React from "react";
import '../estilos/principal.css'
import { Link } from "react-router-dom";

const NavMenu = () => {
    return(
        <header className="menu">
            <Link to="/" className="logo">Libreria Facil</Link>
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

