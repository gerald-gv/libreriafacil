import React from "react";
import "../estilos/principal.css"
import { Link } from "react-router-dom";


const scrollTop = () => {
    window.scrollTo({
        top: 0,
    })
}

const SectionInicio = () => {
    return (
        <section className="seccion">
            <div className="contenedor-info">
                <div className="info-inicio">
                    <h2>Tu destino literario de confianza</h2>
                    <p>
                        En Librería Fácil encontrarás los mejores títulos con la garantía de calidad y el mejor servicio. Tu
                        sector de confianza esta aqui.
                    </p>
                    <div className="botones-seccion">
                        <Link to="/" className="btn btn-primario" onClick={scrollTop}>
                            Explorar Librería
                        </Link>
                        <Link to="/servicios" className="btn btn-secundario" onClick={scrollTop}>
                            Conocer Más
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionInicio
