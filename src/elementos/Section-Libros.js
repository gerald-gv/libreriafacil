import React from "react";
import SliderLibros from "../componente-reutlizable/SliderLibros";



const ProductoLibros = ({libros = [], cargando = false}) =>{    
    return(
        <>
            <SliderLibros libros={libros}  cargando={cargando}/>
        </>
    )
}

export default ProductoLibros