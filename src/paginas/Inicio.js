import React from "react";
import SliderImg from "../elementos/Slider"
import Fecha from '../elementos/Fecha';
import Hora from '../elementos/Hora';
import ProductoLibros from "../elementos/Section-Libros"
import SectionInicio from "../elementos/Section-Inicio"
import "../estilos/principal.css"

const Inicio = () => {
  return (
    <div>
        <div className="info-datetime">
            <Fecha />
            <Hora />
          </div>
        <main>
            <SliderImg />
            <h2 className="titulo-slider">Libros Destacados</h2>
            <ProductoLibros />
        </main>
        <SectionInicio />
    </div>
  )
}

export default Inicio

