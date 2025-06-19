import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos'
import Servicios from './paginas/Servicios_'
import Registrate from './paginas/Registrate'
import IniciarSesion from './paginas/IniciarSesion'
import RecuperarCuenta from './paginas/RecuperarCuenta'
import Layout from './paginas/Layout';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element ={<Inicio/>} />
        <Route path = "/productos" element ={<Productos/>} />
        <Route path = "/servicios" element ={<Servicios />} />
        <Route path = "/registrate" element ={<Registrate/>} />
        <Route path = "/iniciar-sesion" element ={<IniciarSesion/>} />
        <Route path = "/recuperar-cuenta" element ={<RecuperarCuenta/>} />
      </Route>
    </Routes>
  );
}

export default App;
