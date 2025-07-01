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
        fetch(`${API_URL}/api/ventas?populate[users_permissions_user][fields][0]=email&populate=producto`)
            .then(res => res.json())
            .then(data => {
                console.log("Data de ventas cruda:", data);

                const ventasMap = data.data.map(v => {
                    const usuario = v.users_permissions_user?.email || "Sin usuario";
                    return {
                        usuario,
                        titulo: v.producto?.titulo || v.titulo || "Sin título",
                        precio: v.precio_unitario,
                        cantidad: v.cantidad,
                        total: v.precio_total,
                        fecha: v.fecha,
                        direccion: v.direccion || "Sin dirección"
                    };
                });

                console.log("Ventas procesadas:", ventasMap);
                setDatosVentas(ventasMap);
                SetRecords(ventasMap);
            })
            .catch(err => {
                console.error("Error al cargar data", err);
            });
    }, []);


    const { setUsuario } = useContext(UsuarioContext)
    const Navegar = useNavigate();

    const columnas = [
        {
            name: "Usuario",
            selector: row => row.usuario,
        },
        {
            name: "Título",
            selector: row => row.titulo,
            sortable: true
        },
        {
            name: "Precio Unitario",
            selector: row => `S/ ${row.precio.toFixed(2)}`
        },
        {
            name: "Cantidad",
            selector: row => row.cantidad
        },
        {
            name: "Total",
            selector: row => `S/ ${row.total.toFixed(2)}`
        },
        {
            name: "Direccion",
            selector: row => row.direccion
        },
        {
            name: "Fecha y Hora",
            selector: row => new Date(row.fecha).toLocaleString("es-PE")
        }
    ];


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
                <h1 className="titulo-h1">Bienvenido Administrador</h1>
            </header>
            <main className="main-tabla">
                <h2 className="titulo-h2">Sistema de reporte de ventas</h2>

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