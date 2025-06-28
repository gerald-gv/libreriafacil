import React, { useEffect, useState } from 'react'
import { carritoContext } from './carritoContext'


const CarritoCompo = ({ children }) => {
  //useStates iniciales
  const [allProducts, setAllProducts] = useState(obtenerCarrito())
  const [total, setTotal] = useState(obtenerSubtotal)
  const [counter, setCounter] = useState(obtenerCantidadProductos)

  //funcion para agregar un producto
  const onAddProduct = (libro) => {

    if (allProducts.find(item => item.titulo === libro.titulo)){
      const products = allProducts.map(item => item.titulo === libro.titulo ? { ...item, cantidad: item.cantidad + 1} : item);
      

      setTotal(total + libro.precio * libro.cantidad)
      setCounter(counter + libro.cantidad)
      return setAllProducts([...products]);
    }

    setCounter(counter + libro.cantidad)
    setTotal(total + libro.precio * libro.cantidad)
    setAllProducts([...allProducts, libro])

  }
  //funcion para eliminar un producto
  const onDeleteProduct = (libro) => {
    const results = allProducts.filter(item => item.titulo !== libro.titulo);

    setCounter(counter - libro.cantidad);
    setTotal(total - libro.precio * libro.cantidad);
    setAllProducts(results)
  }
  //Sumar cantidad
  const onAdd = (libro) => {
    libro.cantidad = libro.cantidad + 1;
    setCounter(counter + 1);
    setTotal(total + libro.precio * 1);
    return setAllProducts([...allProducts]);
  }
  //Restar cantidad
  const onMinus = (libro) => {
    if (libro.cantidad > 1){
      libro.cantidad = libro.cantidad - 1;
      setCounter(counter - 1);
      setTotal(total - libro.precio * 1);
      return setAllProducts([...allProducts]);
    }
    else{
      return;
    }
  }

  //funcion para obtener el carrito guardado en el localStorage
  
  function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('cart');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }
  function obtenerCantidadProductos() {
    const cantProductosGuardados = localStorage.getItem('countProducts');
    return cantProductosGuardados ? JSON.parse(cantProductosGuardados) : 0;
  }
  function obtenerSubtotal() {
    const subTotalGuardado = localStorage.getItem('subTotal');
    return subTotalGuardado ? JSON.parse(subTotalGuardado) : 0;
  }
  //useEffect para definir el JSON que guardara los productos

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(allProducts))
  }, [allProducts]);
  useEffect(() => {
    localStorage.setItem('countProducts', JSON.stringify(counter))
  });
  useEffect(() => {
    localStorage.setItem('subTotal', JSON.stringify(total))
  });
  
  //el proveedor
  return (
    <carritoContext.Provider value = {{ allProducts, total, counter, onAddProduct, onDeleteProduct, onAdd, onMinus}}>
        { children }
    </carritoContext.Provider>
  )
}

export default CarritoCompo