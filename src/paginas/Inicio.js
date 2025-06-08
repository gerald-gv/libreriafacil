import React from "react";
import NavMenu from "../elementos/NavMenu"
import SliderImg from "../elementos/Slider"
import SectionInicio from "../elementos/Section-Inicio"
import Footer from "../elementos/Footer"
import "../estilos/principal.css"

const Inicio = () => {
  return (
    <div>
        <NavMenu />
        <main>
            <SliderImg />
        </main>
        <SectionInicio />
        <Footer />
    </div>
  )
}

export default Inicio

