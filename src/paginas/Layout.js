import React from 'react';
import NavMenu from '../elementos/NavMenu';
import Footer from '../elementos/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavMenu />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;