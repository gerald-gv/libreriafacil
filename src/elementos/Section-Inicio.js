import React from "react";
import "../estilos/principal.css"

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
                    <button className="btn btn-primario">Explorar Libreria</button>
                    <button className="btn btn-secundario">Conocer Más</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SectionInicio
