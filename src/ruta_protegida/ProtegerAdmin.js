import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../usuario/UsuarioContext";

const ProtegerAdmin = ({ children }) => {
    const { usuario } = useContext(UsuarioContext);

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    if (usuario.email !== "admin@gmail.com" && usuario) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtegerAdmin;