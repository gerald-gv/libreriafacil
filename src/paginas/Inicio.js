import React, { useEffect, useState } from "react";
import SliderImg from "../elementos/Slider"
import Fecha from '../elementos/Fecha';
import Hora from '../elementos/Hora';
import ProductoLibros from "../elementos/Section-Libros"
import SectionInicio from "../elementos/Section-Inicio"
import "../estilos/principal.css"
import img1 from "../imagenes/libro1.jpg"
import img2 from "../imagenes/libro2.jpg"
import img3 from "../imagenes/libro3.jpg"
import img4 from "../imagenes/libro4.jpg"

const imagenes = { img1, img2, img3, img4 };

const Inicio = () => {

    const [librosDestacados, setLibrosDestacados] = useState([]);

  useEffect(() => {
    fetch("/libros.json")
      .then((res) => res.json())
      .then((data) => {
        const libros_Destacados = data.destacados.map((libro) => ({
          ...libro,
          img: imagenes[libro.img] || ""
        }));
        setLibrosDestacados(libros_Destacados);
      });
  }, []);


  return (
    <div>
        <div className="info-datetime">
            <Fecha />
            <Hora />
          </div>
        <main>
            <SliderImg />
            <h2 className="titulo-slider">Libros Destacados</h2>
            <ProductoLibros libros={librosDestacados} />
        </main>
        <SectionInicio />
    </div>
  )
}

export default Inicio

