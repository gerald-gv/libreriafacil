import { createContext, useState, useEffect } from "react";

export const UsuarioContext = createContext();

export const UsuarioGlobal = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar sesión persistente globalmente
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setLoading(false);
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
};