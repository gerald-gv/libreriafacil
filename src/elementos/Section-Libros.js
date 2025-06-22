import React from "react";
import SliderLibros from "../componente-reutlizable/SliderLibros";



const ProductoLibros = ({libros = []}) =>{    
    return(
        <>
            <SliderLibros libros={libros}  />
        </>
    )
}

export default ProductoLibros