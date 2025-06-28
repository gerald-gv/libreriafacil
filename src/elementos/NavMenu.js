import React, { useContext } from "react";
import { UsuarioContext } from "../usuario/UsuarioContext";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import '../estilos/principal.css'
import Menu from "../imagenes/menu.png";
import Carrito from "../imagenes/carrito.png";
import { carritoContext } from "../context/carritoContext";

const NavMenu = () => {
    const { counter } = useContext(carritoContext)
    //Utiliza lo puesto en el UsuarioContext.js
    const {usuario, setUsuario} = useContext(UsuarioContext)
    const Navegar = useNavigate();
    
    const handleLogout = () =>{
        localStorage.removeItem("usuario") // remueve el item usuario y se borra la persistencia
        setUsuario(null);
        Navegar("/")
    }

    const scrollTop = () =>{
    window.scrollTo({
        top: 0,
    })
}

    return(
        <header className="menu">
            <Link to="/" className="logo">
                <BookOpen size={24} className="sublogo"/>
                {usuario ? `Bienvenido, ${usuario.username}` : "Librería Fácil"}
            </Link>
            <input type="checkbox" id="menu"/>
            <label htmlFor="menu">
                <img src={Menu} className="menu-icon" alt="Menu"/>
            </label>
            <nav className="navBar">
                <ul>
                    <li><Link to="/" onClick={scrollTop}>Inicio</Link></li>
                    <li><Link to="/servicios" onClick={scrollTop}>Servicios</Link></li>
                    <li><Link to="/productos" onClick={scrollTop}>Libros</Link></li>
                    <li>
                        {/*Verifica si hay usuario, si hay usuario logueado, aparece boton de cerrar sesion*/}
                        {usuario ? (
                            <Link onClick={handleLogout}>Cerrar Sesion</Link>
                        ):(
                            <Link to="/iniciar-sesion">Iniciar Sesion</Link>
                        )}
                    </li>
                    <li>
                        <Link to="/carrito" className="cart">
                            <img src={Carrito} alt="carrito"/>
                            <span>{counter}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>  
    );
}

export default NavMenu;

