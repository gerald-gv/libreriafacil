import React from "react";
import '../estilos/principal.css'
import { Link } from "react-router-dom";

const NavMenu = () => {
    return(
    <div className="menu">
        <Link to="/" className="logo">Libreria Facil</Link>
        <nav className="navBar">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/">Servicios</Link></li>
                <li><Link to="/">Libros</Link></li>
                <li><Link to="/">Contactos</Link></li>
            </ul>
        </nav>
    </div>  
    );
}

export default NavMenu;

