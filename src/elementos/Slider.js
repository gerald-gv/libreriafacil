import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../estilos/principal.css";
import img1 from "../imagenes/libreria1.jpg";
import img2 from "../imagenes/libreria2.jpg";
import img3 from "../imagenes/libreria3.png";
import { ReactComponent as FlechaIzquierda } from "../imagenes/iconmonstr-angel-left-thin.svg";
import { ReactComponent as FlechaDerecha } from "../imagenes/iconmonstr-angel-right-thin.svg";

// Array de imágenes
const imagenes = [img1, img2, img3];

// Componente principal
const SliderImg = () => {
  const [slideActual, setSlideActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const totalSlides = imagenes.length;

  const siguienteSlide = useCallback(() => {
    setSlideActual((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const anteriorSlide = useCallback(() => {
    setSlideActual((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (pausado) return;
    const intervalo = setInterval(siguienteSlide, 4500);
    return () => clearInterval(intervalo);
  }, [siguienteSlide, pausado]);

  return (
    <section className="seccion-carrusel">
      <div
        className="contenedor-carrusel"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        

        <div className="carrusel">
          <div
            className="pista-carrusel"
            style={{ "--slide-index": slideActual }}
          >
            {imagenes.map((src, index) => (
              <div className="slide-carrusel" key={index}>
                <Link to="/">
                  <div className="overlay-img">
                    <img src={src} alt={`Slide ${index + 1}`} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Botones */}
        <button
          className="botones-carrusel izquierda"
          onClick={anteriorSlide}
          aria-label="Anterior"
        >
          <FlechaIzquierda />
        </button>
        <button
          className="botones-carrusel derecha"
          onClick={siguienteSlide}
          aria-label="Siguiente"
        >
          <FlechaDerecha />
        </button>
      </div>
    </section>
  );
};

export default SliderImg;
