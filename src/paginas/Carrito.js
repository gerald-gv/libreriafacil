import React, { useContext } from "react";
import "../estilos/cartStyles.css"
import { carritoContext } from "../context/carritoContext";


const API_URL = process.env.REACT_APP_API_URL;
const Carrito = () => {
  const { total, allProducts, onDeleteProduct, onAdd, onMinus, vaciarCarrito } = useContext(carritoContext)

  const finalizarCompra = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = usuario?.jwt;

    for (const libro of allProducts) {
      const ventaData = {
        data: {
          titulo: libro.titulo,
          cantidad: libro.cantidad,
          precio_unitario: libro.precio,
          precio_total: libro.precio * libro.cantidad,
          fecha: new Date().toISOString(),
          producto: libro.id,
          users_permissions_user: usuario?.id || null
        }
      };

      try {
        await fetch(`${API_URL}/api/ventas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          },
          body: JSON.stringify(ventaData)
        });
      } catch (error) {
        console.error("Error registrando venta:", error);
      }
    }

    vaciarCarrito();
    alert("Compra Registrada exitosamente")
  };

  return (
    <div className="font">
      <main className="main-container">
        <section className="list-products">
          <h1 className="titulo-carrito">Carrito de compras</h1>
          {
            allProducts.length ? (
              <>
                <div className="products">
                  {allProducts.map((libro, index) => (
                    <div className="product" key={index}>
                      <img src={libro.img} alt={libro.imagen} />
                      <div className="description">
                        <p>{libro.titulo}</p>
                        <span>{libro.precio}</span>
                        <div className="count">
                          <button className="minus" onClick={() => onMinus(libro)}>-</button>
                          <span className="quantity">
                            {libro.cantidad}
                          </span>
                          <button className="plus" onClick={() => onAdd(libro)}>+</button>
                        </div>
                        <button className="delete" onClick={() => onDeleteProduct(libro)}>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="buy-books">
                  <p>Subtotal: S/. {total}</p>
                  <form className="direction">
                    <p>Direccion de envio</p>
                    <div className="region">
                      <div className="specific-region">
                        <label for="departamento" className="title-input-name">Departamento</label>
                        <select name="departamento" id="departamento" className="selector-option">
                          <option value="Lima">Lima</option>
                          <option value="Amazonas">Amazonas</option>
                          <option value="Apurímac">Apurímac</option>
                          <option value="Arequipa">Arequipa</option>
                          <option value="Ayacucho">Ayacucho</option>
                          <option value="Callao">Callao</option>
                          <option value="Cajamarca">Cajamarca</option>
                          <option value="Cusco">Cusco</option>
                          <option value="Huancavelica">Huancavelica</option>
                          <option value="Huánuco">Huánuco</option>
                          <option value="Ica">Ica</option>
                          <option value="Junín">Junín</option>
                          <option value="La Libertad">La Libertad</option>
                          <option value="Lambayeque">Lambayeque</option>
                          <option value="Loreto">Loreto</option>
                          <option value="Madre De Dios">Madre De Dios</option>
                          <option value="Moquegua">Moquegua</option>
                          <option value="Pasco">Pasco</option>
                          <option value="Piura">Piura</option>
                          <option value="Puno">Puno</option>
                          <option value="San Martín">San Martín</option>
                          <option value="Tacna">Tacna</option>
                          <option value="Tumbes">Tumbes</option>
                          <option value="Ucayali">Ucayali</option>
                          <option value="Áncash">Áncash</option>
                        </select>
                      </div>
                      <div className="specific-region">
                        <label for="province" className="title-input-name">Provincia</label>
                        <input type="text" id="province" name="departamento" className="container-input" required />
                      </div>
                      <div className="specific-region">
                        <label for="district" className="title-input-name">Distrito</label>
                        <input type="text" id="district" name="ciudad" className="container-input" required />
                      </div>
                    </div>
                    <div className="specific-direction">
                      <label for="street" className="title-input-name">Direccion de calle</label>
                      <input type="text" id="street" name="street" className="container-input" required />

                      <label for="postal-code" className="title-input-name">Codigo postal</label>
                      <input type="text" id="postal-code" name="postal-code" className="container-input" required />

                      <label for="street" className="title-input-name">Referencia de la dirección</label>
                      <input type="text" id="street" name="street" className="container-input" />
                    </div>
                  </form>
                  <button onClick={finalizarCompra}>Realizar compra</button>
                </div>
              </>
            ) : (
              <div className="empty">
                <p>El carrito está vacio</p>
              </div>
            )
          }
        </section>
      </main>
    </div>
  )
}

export default Carrito

