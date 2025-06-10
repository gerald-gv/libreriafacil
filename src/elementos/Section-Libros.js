import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules"
import imglibro1 from "../imagenes/libro1.jpg"
import imglibro2 from "../imagenes/libro2.jpg"
import imglibro3 from "../imagenes/libro3.jpg"
import imglibro4 from "../imagenes/libro4.jpg"
import "swiper/css"; 
import "swiper/css/navigation"
import "../estilos/principal.css"
import { Link } from "react-router-dom"

const imglibros = [imglibro1, imglibro2, imglibro3, imglibro4];
const libros = [
    {
        titulo: "Don Quijote de La Mancha", 
        descripcion: "La aventura de un hidalgo que enloquece por los libros de caballería y sale a buscar justicia por el mundo.", 
        precio: "S/.50.00", 
        boton:"Comprar"},
    {
        titulo: "Orgullo y Prejuicio", 
        descripcion: "Una historia de amor y malentendidos en la Inglaterra del siglo XIX.", 
        precio: "S/.65.00", 
        boton:"Comprar"},
    {
        titulo: "Crimen y Castigo", 
        descripcion: "Un joven comete un asesinato y enfrenta las consecuencias psicológicas y morales.", 
        precio: "S/.65.00", 
        boton:"Comprar"},
    {
        titulo: "Cien años de Soledad", 
        descripcion: "La saga mágica de la familia Buendía en el mítico pueblo de Macondo.", 
        precio: "S/.89.00", 
        boton:"Comprar"}
]

const SectionLibros = () =>{    
    return(
        <section className="slider-libros">
                {/*Parte de la libreria Swiper*/}
                <Swiper
                modules ={[Navigation]} 
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                navigation = {true}>
                    {/*Uso del Slider Swiper*/}
                    {libros.map((libro, index)=>(
                        <SwiperSlide key={index}>
                            <div className="cards-libros">
                                <img src={imglibros[index]} alt={libro.titulo}/>
                                <h3>{libro.titulo}</h3>
                                <div className="texto-contenido">
                                    <p className="descripcion-libro">{libro.descripcion}</p>
                                    <p className="precio-libro">{libro.precio}</p>
                                </div>
                                <Link to={"/"}>{libro.boton}</Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
        </section>
    )
}

export default SectionLibros