import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Libros from './paginas/Libros';
import Servicios from './paginas/Servicios_';
import Registrate from './paginas/Registrate';
import IniciarSesion from './paginas/IniciarSesion';
import Ventas from './admin_reporte/ReporteVentas';
import ProtegerAdmin from './ruta_protegida/ProtegerAdmin';
import Carrito from './paginas/Carrito';
import Layout from './paginas/Layout';
import CarritoCompo from './context/CarritoCompo';
import MisPedidos from './paginas/MisPedidos';
import RutaProtegida from './ruta_protegida/ProtegerRuta';

function App() {
  return (
    <CarritoCompo>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="/productos" element={<Libros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/registrate" element={<Registrate />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />

          <Route path="/mis-pedidos" element={
            <RutaProtegida>
              <MisPedidos/>
            </RutaProtegida>
          } />

          <Route path="/carrito" element={<Carrito />} />
        </Route>
        <Route path="/reporte-ventas" element={
          <ProtegerAdmin>
            <Ventas />
          </ProtegerAdmin>
        } />
      </Routes>
    </CarritoCompo>
  );
}

export default App;
