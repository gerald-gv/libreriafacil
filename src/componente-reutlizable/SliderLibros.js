import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper/modules";
import { useContext } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "../estilos/principal.css";
import { carritoContext } from "../context/carritoContext";
import SkeletonLibros from "./SkeletonLibros";

const SliderLibros = ({ libros = [], cargando = false }) => {
    const { onAddProduct } = useContext(carritoContext)
    const loopActivo = libros.length > 3; // Solo se activa si hay más de 3
    return (
        <section className="slider-libros">
            <Swiper
                modules={[Navigation, Autoplay]}
                loop={loopActivo}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }}
            >
                {cargando
                    ? [...Array(3)].map((_, i) => (
                        <SwiperSlide key={i}>
                            <SkeletonLibros />
                        </SwiperSlide>
                    ))
                    : libros.map((libro, index) => (
                        <SwiperSlide key={index}>
                            <div className="cards-libros">
                                <img src={libro.img} alt={libro.titulo} />
                                <h3>{libro.titulo}</h3>
                                <div className="texto-contenido">
                                    <p className="descripcion-libro">{libro.descripcion}</p>
                                    <p className="precio-libro">S/.{Number(libro.precio).toFixed(2)}</p>
                                </div>
                                <button to="/" onClick={() => onAddProduct({ ...libro, precio: Number(libro.precio), cantidad: 1 })}>Comprar</button>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};

export default SliderLibros;

