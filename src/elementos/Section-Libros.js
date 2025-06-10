import React from "react";
import SliderLibros from "../componente-reutlizable/SliderLibros";
import img1 from "../imagenes/libro1.jpg"
import img2 from "../imagenes/libro2.jpg"
import img3 from "../imagenes/libro3.jpg"
import img4 from "../imagenes/libro4.jpg"

const libros = [
    {
        img: img1,
        titulo: "Don Quijote de La Mancha", 
        descripcion: "La aventura de un hidalgo que enloquece por los libros de caballería y sale a buscar justicia por el mundo.", 
        precio: "S/.50.00", 
        boton:"Comprar"},
    {
        img: img2,
        titulo: "Orgullo y Prejuicio", 
        descripcion: "Una historia de amor y malentendidos en la Inglaterra del siglo XIX.", 
        precio: "S/.65.00", 
        boton:"Comprar"},
    {
        img: img3,
        titulo: "Crimen y Castigo", 
        descripcion: "Un joven comete un asesinato y enfrenta las consecuencias psicológicas y morales.", 
        precio: "S/.65.00", 
        boton:"Comprar"},
    {
        img: img4,
        titulo: "Cien años de Soledad", 
        descripcion: "La saga mágica de la familia Buendía en el mítico pueblo de Macondo.", 
        precio: "S/.89.00", 
        boton:"Comprar"}
]

const ProductoLibros = () =>{    
    return(
        <>
            <SliderLibros libros={libros} />
        </>
    )
}

export default ProductoLibros