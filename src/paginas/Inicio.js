import React, { useEffect, useState } from "react";
import SliderImg from "../elementos/Slider";
import Fecha from '../elementos/Fecha';
import Hora from '../elementos/Hora';
import ProductoLibros from "../elementos/Section-Libros";
import SectionInicio from "../elementos/Section-Inicio";
import "../estilos/principal.css";


const API_URL = process.env.REACT_APP_API_URL;
const Inicio = () => {
  const [librosDestacados, setLibrosDestacados] = useState([]);

  

  console.log("API_URL:", API_URL);
  useEffect(() => {
    fetch(`${API_URL}/api/categorias?populate[productos][populate]=imagen`)
      .then(res => res.json())
      .then(data => {
        // Encontrar el titulo de categoria destacados
        const categoriaDestacados = data.data.find(cat => cat.titulo === "destacados");
        if (!categoriaDestacados || !categoriaDestacados.productos) return;

        //Recorrer los productos con map para retornar el contenido
        const productos = categoriaDestacados.productos.map(producto => {
          const imagen = producto.imagen?.url;

          return {
            titulo: producto.titulo,
            descripcion: producto.descripcion,
            precio: producto.precio.toFixed(2),
            stock: producto.stock,
            img: imagen?.startsWith("http") ? imagen : `${API_URL}${imagen}`

          };
        });

        setLibrosDestacados(productos);
      })
      .catch(err => console.error("Error al cargar libros destacados:", err));
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
  );
};

export default Inicio;


