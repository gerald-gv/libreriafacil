import { useEffect, useState } from "react";
import Fecha from '../elementos/Fecha';
import Hora from '../elementos/Hora';
import ProductoLibros from "../elementos/Section-Libros";

const Productos = () => {

  const [datosLibros, setDatosLibros] = useState({});

  useEffect(() => {
    fetch("http://localhost:1337/api/categorias?populate[productos][populate]=imagen")
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
              img: imagen ? `http://localhost:1337${imagen}` : ""
            };
          });

          if (nombreCategoria && productos) {
            categorias[nombreCategoria] = productos;
          }
        });

        setDatosLibros(categorias);
      })
      .catch(err => console.error("Error a la carga de libros", err));
  }, []);


    return (
        <>
            <div className="info-datetime">
                <Fecha />
                <Hora />
            </div>
            <main >
                <h2 className="titulo-slider">Libros Destacados</h2>
                {datosLibros.destacados && <ProductoLibros libros={datosLibros.destacados} />}
                <h2 className="titulo-slider">Ficcion Contemporánea</h2>
                {datosLibros.ficcion && <ProductoLibros libros={datosLibros.ficcion} />}

                <h2 className="titulo-slider">Desarrollo Personal</h2>
                {datosLibros.desarrollo && <ProductoLibros libros={datosLibros.desarrollo} />}

                <h2 className="titulo-slider">Terror y suspenso</h2>
                {datosLibros.terror && <ProductoLibros libros={datosLibros.terror} />}
            </main>
        </>
    )
}

export default Productos;