import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../usuario/UsuarioContext";
import DataTable from "react-data-table-component";
import "../estilos/reporte_ventas.css"

const API_URL = process.env.REACT_APP_API_URL;

const Ventas = () => {

    const [datosVentas, setDatosVentas] = useState([]);

    const [records, SetRecords] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/productos`)
            .then(res => res.json())
            .then(data => {
                const productos = data.data.map(prod => {
                    return {
                        titulo: prod.titulo,
                        precio: prod.precio,
                    };
                });
                setDatosVentas(productos);
                SetRecords(productos);
            })
            .catch(err => {
                console.error("Error al cargar data", err);
            });
    }, []);

    const { setUsuario } = useContext(UsuarioContext)
    const Navegar = useNavigate();

    const columnas = [
        {
            name: "Titulo",
            selector: row => row.titulo,
            sortable: true
        },
        {
            name: "Precio",
            selector: row => `S/ ${row.precio.toFixed(2)}`,
        }
        /*
        {
            name: "Cantidad",
            selector: row => row.cantidad,
        },
        {
            name: "Total",
            selector: row => row.precio,
        },
        {
            name: "Fecha y Hora",
            selector: row => new Date(row.fecha).toLocaleString("es-PE"),
        }*/
    ]


    const handleLogout = () => {
        localStorage.removeItem("usuario") // remueve el item usuario y se pierde la persistencia 
        setUsuario(null);
        Navegar("/")
    }

    // Filtrar por producto
    const handleChange = (e) => {
        const filtrarRecords = datosVentas.filter(record => {
            return record.titulo.toLowerCase().includes(e.target.value.toLowerCase());
        })
        SetRecords(filtrarRecords)
    }

    return (
        <>
            <div className="contenedor-menu">
                <nav className="menu-reporte">
                    <ul>
                        <li>
                            <button onClick={handleLogout} className="cerrar-sesion-btn">
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <header className="header-titulo">
                <h1>Bienvenido Administrador</h1>
            </header>
            <main className="main-tabla">
                <h2>Sistema de reporte de ventas</h2>

                <DataTable
                    title="Ventas de Libros"
                    subHeader
                    subHeaderComponent={
                        <input className="busqueda"
                            type="text"
                            placeholder="Buscar Libros..."
                            onChange={handleChange} />
                    }
                    columns={columnas}
                    data={records}
                    pagination

                />
            </main>
        </>
    )
}

export default Ventas;