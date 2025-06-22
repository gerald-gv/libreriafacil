import { useEffect, useState } from "react";
import Fecha from '../elementos/Fecha';
import Hora from '../elementos/Hora';
import ProductoLibros from "../elementos/Section-Libros"
import img1 from "../imagenes/libro1.jpg"
import img2 from "../imagenes/libro2.jpg"
import img3 from "../imagenes/libro3.jpg"
import img4 from "../imagenes/libro4.jpg"
import imgf1 from "../imagenes/libro5.jpg"
import imgf2 from "../imagenes/libro6.jpg"
import imgf3 from "../imagenes/libro7.jpg"
import imgf4 from "../imagenes/libro8.jpg"
import imgd1 from "../imagenes/libro9.jpg"
import imgd2 from "../imagenes/libro10.jpg"
import imgd3 from "../imagenes/libro11.jpg"
import imgd4 from "../imagenes/libro12.jpg"
import imgt1 from "../imagenes/libro13.jpg"
import imgt2 from "../imagenes/libro14.jpg"
import imgt3 from "../imagenes/libro15.jpg"
import imgt4 from "../imagenes/libro16.jpg"

const imagenes = { 
    img1, img2, img3, img4,
    imgf1, imgf2, imgf3, imgf4,
    imgd1, imgd2, imgd3, imgd4,
    imgt1, imgt2, imgt3, imgt4
};

const Productos = () => {

    const [datosLibros, setDatosLibros] = useState({});

    useEffect(() => {
        fetch("/libros.json")
            .then(res => res.json())
            .then(data => {
                const reempImagenes = (libros) =>
                    libros.map((libro) => ({
                        ...libro,
                        img: imagenes[libro.img] || ""
                    }));
                setDatosLibros({
                    destacados:reempImagenes(data.destacados),
                    ficcion:reempImagenes(data.ficcion),
                    desarrollo:reempImagenes(data.desarrollo),
                    terror:reempImagenes(data.terror),
                     
                })
            })
            .catch((err) => console.error("Error cargando libros:", err));
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