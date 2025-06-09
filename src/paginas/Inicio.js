import React from "react";
import NavMenu from "../elementos/NavMenu"
import SliderImg from "../elementos/Slider"
import SectionLibros from "../elementos/Section-Libros"
import SectionInicio from "../elementos/Section-Inicio"
import Footer from "../elementos/Footer"
import "../estilos/principal.css"

const Inicio = () => {
  return (
    <div>
        <NavMenu />
        <main>
            <SliderImg />
            <h2 className="titulo-slider">Libros Destacados</h2>
            <SectionLibros />
        </main>
        <SectionInicio />
        <Footer />
    </div>
  )
}

export default Inicio

