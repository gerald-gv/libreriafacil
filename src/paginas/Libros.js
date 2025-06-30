import { useEffect, useState } from "react";
import Fecha from '../elementos/Fecha';
import Hora from '../elementos/Hora';
import ProductoLibros from "../elementos/Section-Libros";

const Productos = () => {

  const [datosLibros, setDatosLibros] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/categorias?populate[productos][populate]=imagen`)
      .then(res => res.json())
      .then(data => {
        console.log("Respuesta completa de Strapi:", data);

        const categorias = {};

        data.data.forEach(categoria => {
          const nombreCategoria = categoria.titulo;
          const productos = categoria.productos?.map(producto => {
            const imagen = producto.imagen?.url;

            return {
              titulo: producto.titulo,
              descripcion: producto.descripcion,
              precio: producto.precio,
              stock: producto.stock,
              img: imagen ? `${API_URL}${imagen}` : ""
            };
          });

          if (nombreCategoria && productos) {
            categorias[nombreCategoria] = productos;
          }
        });

        setDatosLibros(categorias);
      })
      .catch(err => console.error("Error a la carga de libros", err))
      .finally(() => setCargando(false));
}, [API_URL]);


  return (
    <>
      <div className="info-datetime">
        <Fecha />
        <Hora />
      </div>
      <main >
        <h2 className="titulo-slider">Libros Destacados</h2>
        <ProductoLibros libros={datosLibros.destacados || []} cargando={cargando} />

        <h2 className="titulo-slider">Ficción Contemporánea</h2>
        <ProductoLibros libros={datosLibros.ficcion || []} cargando={cargando} />

        <h2 className="titulo-slider">Desarrollo Personal</h2>
        <ProductoLibros libros={datosLibros.desarrollo || []} cargando={cargando} />

        <h2 className="titulo-slider">Terror y suspenso</h2>
        <ProductoLibros libros={datosLibros.terror || []} cargando={cargando} />
      </main>
    </>
  )
}

export default Productos;