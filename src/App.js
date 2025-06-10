import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos'
import Servicios from './paginas/Servicios_'
import Registrate from './paginas/Registrate'
import IniciarSesion from './paginas/IniciarSesion'
import RecuperarCuenta from './paginas/RecuperarCuenta'
function App() {
  return (
    <Routes> 
      <Route path = "/" element ={<Inicio/>} />
      <Route path = "/Productos" element ={<Productos/>} />
      <Route path = "/Servicios" element ={<Servicios />} />
      <Route path = "/Registrate" element ={<Registrate/>} />
      <Route path = "/IniciarSesion" element ={<IniciarSesion/>} />
      <Route path = "/RecuperarCuenta" element ={<RecuperarCuenta/>} />
    </Routes>
  );
}

export default App;
