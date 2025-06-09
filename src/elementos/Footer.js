import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Facebook , Twitter , Instagram ,  MapPin, Phone, Mail,} from "lucide-react";
import "../estilos/principal.css";

const enlacesRapidos = [
    {label: "Inicio",    path: "/"},
    {label: "Servicios", path: "/"},
    {label: "Libros",    path: "/"},
    {label: "Contactos", path: "/"},
]

const datosContacto = [
  {
    icon: <MapPin size={24} />,
    texto: "Jirón de la Unión 1081, Lima 15001"
  },
  {
    icon: <Phone size={24} />,
    texto: "+51 999 888 777"
  },
  {
    icon: <Mail size={24} />,
    texto: "info@biblioteca.com"
  }
];

const enlacesLegales = [
    {path: "/", texto: "Politicas de Privacidad"},
    {path: "/", texto: "Terminos de Uso"},
    {path: "/", texto: "Politica de Cookies"}
]

const Footer = () => {
  return (
    <footer className="footer-pagina">
        <div className="footer-contenedor">
            <div className="contenido-footer">
                <div className="columna-footer">
                    <Link to = "/" className="logo-footer">
                        <BookOpen size={24} />
                        <span>Libreria Facil</span>
                    </Link>
                    <p className="descripcion-footer">  Tu fuente de confianza numero 1, siempre impulsando a más lectores dia tras dia, unete a nosotros.</p>
                    <div className="redes-sociales">
                        <a className= "icono-social" href="https://www.facebook.com/ "><Facebook  size={20}  /></a>
                        <a className= "icono-social" href="https://x.com/?lang=es"><Twitter   size={20}  /></a>
                        <a className= "icono-social" href="https://www.instagram.com/"><Instagram size={20} /></a>
                    </div>
                </div>

                <div className="columna-footer">
                    <h3 className="titulo-enlaces">Enlaces Rapidos</h3>
                    <ul className="enlaces">
                        {enlacesRapidos.map((enlace, index)=>(
                            <li key={index}>
                                <Link to ={enlace.path}>{enlace.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="columna-footer">
                    <h3 className="titulo-contacto">Contacto</h3>
                    <ul className="info-contacto">
                        {datosContacto.map((dato, index)=>(
                            <li key={index} className="contacto-dato">
                                <div className="icono-contacto">{dato.icon}</div>
                                <span>
                                    {dato.texto.split("\n").map((line, i)=>(
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="barra-footer">
                <p className="copyright">@2025 Libreria Facil. Todos los Derechos Reservados</p>
                <div className="enlaces-legales">
                    {enlacesLegales.map((enlace, index)=>(
                        <Link key={index} to={enlace.path} className="enlace-legal">
                            {enlace.texto}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;

