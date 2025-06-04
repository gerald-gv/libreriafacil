import React from "react";
import '../estilos/principal.css'

const NavBar = () => {
    return(
        <nav className="navBar">
            <ul>
                <li>Inicio</li>
                <li>Servicios</li>
                <li>Libros</li>
                <li>Contactos</li>
            </ul>
        </nav>
    );
}

export default NavBar;