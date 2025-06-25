import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Inicio from './paginas/Inicio';
import Libros from './paginas/Libros';
import Servicios from './paginas/Servicios_'
import Registrate from './paginas/Registrate'
import IniciarSesion from './paginas/IniciarSesion'
import Ventas from './paginas/ReporteVentas';
import RecuperarCuenta from './paginas/RecuperarCuenta'
import Layout from './paginas/Layout';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element ={<Inicio/>} />
        <Route path = "/productos" element ={<Libros/>} />
        <Route path = "/servicios" element ={<Servicios />} />
        <Route path = "/registrate" element ={<Registrate/>} />
        <Route path = "/iniciar-sesion" element ={<IniciarSesion/>} />
        <Route path = "/recuperar-cuenta" element ={<RecuperarCuenta/>} />
      </Route>
      <Route path = "/reporte-ventas" element = {<Ventas/>} />
    </Routes>
  );
}

export default App;
