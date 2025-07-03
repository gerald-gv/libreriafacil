import React from 'react';
import NavMenu from '../elementos/NavMenu';
import Footer from '../elementos/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app">
      <NavMenu />
      <main className="contenido-principal">
        <Outlet /> {/* Aquí se cargan tus páginas: Inicio, Libros, MisPedidos, etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;