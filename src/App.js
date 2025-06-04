import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos'

function App() {
  return (
    <Routes> 
      <Route path = "/" element ={<Inicio/>} />
      <Route path = "/Productos" element ={<Productos/>} />
    </Routes>
  );
}

export default App;
