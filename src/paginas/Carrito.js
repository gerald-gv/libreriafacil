import { useContext, useState } from "react";
import { carritoContext } from "../context/carritoContext";
import { useNavigate } from "react-router-dom";
import MapaInteractivo from "../componente-reutlizable/MapaInteractivo";
import Swal from "sweetalert2";
import "../estilos/cartStyles.css";

const API_URL = process.env.REACT_APP_API_URL;

const Carrito = () => {
  const { total, allProducts, onDeleteProduct, onAdd, onMinus, vaciarCarrito } = useContext(carritoContext);
  const Redirigir = useNavigate();

  const [ubicacion, setUbicacion] = useState(null);
  const [ubicacionValida, setUbicacionValida] = useState(false);

  const finalizarCompra = async () => {
    if (!ubicacion || !ubicacionValida) {
      Swal.fire({
        icon: "warning",
        title: "Ubicación inválida",
        text: "Debes seleccionar una dirección válida dentro de Lima Metropolitana.",
      });
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || !usuario.jwt) {
      Swal.fire({
        icon: "warning",
        title: "Necesitas una cuenta",
        text: "Debes registrarte o iniciar sesión para continuar.",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Iniciar Sesión",
        denyButtonText: "Registrarse",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#28a745",
        denyButtonColor: "#6f42c1",
        cancelButtonColor: "#6c757d",
      }).then((rpta) => {
        if (rpta.isConfirmed) Redirigir("/iniciar-sesion");
        else if (rpta.isDenied) Redirigir("/registrate");
      });
      return;
    }

    const token = usuario.jwt;
    for (const libro of allProducts) {
      const ventaData = {
        data: {
          titulo: libro.titulo,
          cantidad: libro.cantidad,
          precio_unitario: libro.precio,
          precio_total: libro.precio * libro.cantidad,
          direccion: ubicacion.direccion,
          fecha: new Date().toISOString(),
          producto: libro.id,
          users_permissions_user: usuario.id,
        },
      };

      try {
        await fetch(`${API_URL}/api/ventas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ventaData),
        });
      } catch (error) {
        console.error("Error registrando venta:", error);
      }
    }

    vaciarCarrito();
    Swal.fire({
      icon: "success",
      title: "¡Compra registrada!",
      text: "Tu compra se ha realizado correctamente.",
    });
  };

  return (
    <div className="font">
      <main className="main-container">
        <section className="list-products">
          <h1 className="titulo-carrito">Carrito de compras</h1>

          {allProducts.length ? (
            <>
              <div className="products">
                {allProducts.map((libro, index) => (
                  <div className="product" key={index}>
                    <img src={libro.img} alt={libro.titulo} />
                    <div className="description">
                      <p>{libro.titulo}</p>
                      <span>S/.{libro.precio.toFixed(2)}</span>
                      <div className="count">
                        <button className="minus" onClick={() => onMinus(libro)}>-</button>
                        <span className="quantity">{libro.cantidad}</span>
                        <button className="plus" onClick={() => onAdd(libro)}>+</button>
                      </div>
                      <button className="delete" onClick={() => onDeleteProduct(libro)}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="buy-books">
                <p>Subtotal: S/. {total.toFixed(2)}</p>

                <div className="direction">
                  <p>Dirección de envío</p>

                  <div className="specific-direction">
                    <label className="title-input-name">Selecciona tu dirección</label>
                    <MapaInteractivo
                      onUbicacionSeleccionada={(data) => {
                        setUbicacion(data);
                        setUbicacionValida(true);
                        Swal.fire({
                          icon: "success",
                          title: "Dirección válida",
                          text: `Se seleccionó: ${data.direccion}`,
                        });
                      }}
                    />
                  </div>
                </div>

                <button className="comprar" onClick={finalizarCompra}>
                  Realizar compra
                </button>
              </div>
            </>
          ) : (
            <div className="empty">
              <p>El carrito está vacío</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Carrito;