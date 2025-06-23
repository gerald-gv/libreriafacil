import { createContext, useState, useEffect } from "react";

export const UsuarioContext = createContext();

export const UsuarioGlobal = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [usuariosBD, setUsuariosBD] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        //Cargar usuarios predefinidos desde usuarios.json
        const respuesta = await fetch("/usuarios.json");
        const usuariosJSON = await respuesta.json();

        //Leer usuarios guardados desde el localStorage
        const usuariosLocales = JSON.parse(localStorage.getItem("usuarios")) || [];

        //Combinar los usuarios del JSON y los registrados localmente
        const usuariosGlobales = [...usuariosJSON, ...usuariosLocales];

        // Establecemos los usuariosglobales para guardarlos en UsuariosBD
        setUsuariosBD(usuariosGlobales);

        //Verificar si hay un usuario logueado guardado
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        if (usuarioGuardado) {
          const usuarioValido = usuariosGlobales.find(
            u => u.email === usuarioGuardado.email && u.contraseña === usuarioGuardado.contraseña
          );

          if (usuarioValido)
            setUsuario(usuarioValido);
          else localStorage.removeItem("usuario");
        }
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, usuariosBD, setUsuariosBD }}>
      {children}
    </UsuarioContext.Provider>
  );
};