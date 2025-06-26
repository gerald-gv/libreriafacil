import { createContext, useState, useEffect } from "react";

export const UsuarioContext = createContext();

export const UsuarioGlobal = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Cargar sesión persistente globalmente
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};