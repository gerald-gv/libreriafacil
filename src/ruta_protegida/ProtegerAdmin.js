import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../usuario/UsuarioContext";
import Swal from "sweetalert2";

const ProtegerAdmin = ({ children }) => {
    const { usuario, loading } = useContext(UsuarioContext);
    
    if (loading) return null;

    const esAdmin = usuario.email === "admin@gmail.com"

    if (!esAdmin) {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes permisos de administrador'
        });

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtegerAdmin;