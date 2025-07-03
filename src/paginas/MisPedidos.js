import { useEffect, useState, useContext } from "react";
import { UsuarioContext } from "../usuario/UsuarioContext";
import DataTable from "react-data-table-component";
import "../estilos/reporte_ventas.css";

const API_URL = process.env.REACT_APP_API_URL;

const MisPedidos = () => {
    const { usuario } = useContext(UsuarioContext);
    const [pedidos, setPedidos] = useState([]);
    const [filtrados, setFiltrados] = useState([]);

    useEffect(() => {
        if (!usuario) return;

        fetch(`${API_URL}/api/ventas?filters[users_permissions_user][id][$eq]=${usuario.id}&populate=producto`, {
            headers: {
                Authorization: `Bearer ${usuario.jwt}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                const pedidosTransformados = data.data.map(p => ({
                    titulo: p.producto?.titulo || p.titulo || "Sin título",
                    cantidad: p.cantidad,
                    precio: p.precio_unitario,
                    total: p.precio_total,
                    direccion: p.direccion || "No registrada",
                    fecha: p.fecha,
                }));

                setPedidos(pedidosTransformados);
                setFiltrados(pedidosTransformados);
            })
            .catch(err => console.error("Error al cargar pedidos:", err));
    }, [usuario]);

    const columnas = [
        { name: "Título", selector: row => row.titulo, sortable: true },
        { name: "Cantidad", selector: row => row.cantidad },
        { name: "Precio", selector: row => `S/ ${row.precio.toFixed(2)}` },
        { name: "Total", selector: row => `S/ ${row.total.toFixed(2)}` },
        { name: "Dirección", selector: row => row.direccion },
        { name: "Fecha", selector: row => new Date(row.fecha).toLocaleString("es-PE") },
    ];

    // Filtrado por producto
    const handleFiltro = (e) => {
        const valor = e.target.value.toLowerCase();
        const resultado = pedidos.filter(p => p.titulo.toLowerCase().includes(valor));
        setFiltrados(resultado);
    };

    return (
        <div className="contenedor">
            <h2 className="titulo-h2">Mis Pedidos</h2>
            <DataTable
                title="Historial de compras"
                columns={columnas}
                data={filtrados}
                pagination
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        className="busqueda"
                        onChange={handleFiltro}
                    />
                }
            />
        </div>
    );
};

export default MisPedidos;