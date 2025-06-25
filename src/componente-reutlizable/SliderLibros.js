import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css"; 
import "swiper/css/navigation";
import "../estilos/principal.css";
import { Link } from "react-router-dom";

const SliderLibros = ({ libros = []}) =>{
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
                    320:{
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    768:{
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }}
            >
                {libros.map((libro, index) => (
                    <SwiperSlide key={index}>
                        <div className="cards-libros">
                            <img src={libro.img} alt={libro.titulo} />
                            <h3>{libro.titulo}</h3>
                            <div className="texto-contenido">
                                <p className="descripcion-libro">{libro.descripcion}</p>
                                <p className="precio-libro">{libro.precio}</p>
                            </div>
                            <Link to="/">Comprar</Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default SliderLibros;

