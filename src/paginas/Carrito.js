import { useContext, useRef, useState } from "react";
import { carritoContext } from "../context/carritoContext";
import { validarDireccion } from "../utils/validarDireccion";
import { useNavigate } from "react-router-dom";
import Mapa from "../componente-reutlizable/Mapa";
import Swal from "sweetalert2";
import "../estilos/cartStyles.css"


const API_URL = process.env.REACT_APP_API_URL;

const Carrito = () => {
  const { total, allProducts, onDeleteProduct, onAdd, onMinus, vaciarCarrito } = useContext(carritoContext)
  const Redirigir = useNavigate();

  //Referencia del Input
  const direccionRef = useRef();
  const [coordenadas, setCoordenadas] = useState(null);
  const [direccionValida, setDireccionValida] = useState(false)
  const [direccionConfirmada, setDireccionConfirmada] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Obtiene el valor de direccionRef y verificara si esta lleno
    const direccion = direccionRef.current.value.trim();
    if (!direccion || !/\d/.test(direccion)) {
      Swal.fire({
        icon: 'warning',
        title: 'Dirección inválida',
        text: 'Ingrese una dirección válida y completa (mínimo 10 caracteres).'
      });
      setDireccionValida(false);
      return;
    }


    //Acceder a la prop valido y verificar si es correcto
    const resultado = await validarDireccion(direccion);
    if (!resultado.valido) {
      Swal.fire({
        icon: 'error',
        title: 'Dirrecion invalida',
        text: 'Solo enviamos pedidos a Lima Metropolitana!'
      })
      setDireccionValida(false);
      return;
    }

    // Mostrar mensaje de ubicación aproximada
    Swal.fire({
      icon: 'info',
      title: 'Ubicación referencial',
      text: 'El mapa señala una ubicación aproximada basada en tu dirección. Si no es la correcta, corrígela y vuelve a validar.',
      confirmButtonText: 'Entendido'
    });

    setCoordenadas({ lat: resultado.lat, lon: resultado.lon });
    setDireccionValida(true);
    setDireccionConfirmada(direccion)
  }


  const finalizarCompra = async () => {
    // Obtiene el valor de direccionRef y verificara si esta lleno
    const direccion = direccionRef.current.value.trim();

    // Verificar si ya se validó la dirección
    if (!direccionValida || direccion !== direccionConfirmada) {
      Swal.fire({
        icon: 'warning',
        title: 'Validación pendiente',
        text: 'Debes validar tu dirección antes de comprar.'
      });
      return;
    }


    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuario cargado:", usuario);

    //Verificar si hay usuario o el token de usuario
    if (!usuario || !usuario.jwt) {
      Swal.fire({
        icon: 'warning',
        title: 'Necesitas una cuenta',
        text: 'Debes registrarte o iniciar sesion para continuar!',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Iniciar Sesion',
        denyButtonText: 'Registrarse',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#28a745',
        denyButtonColor: '#6f42c1',
        cancelButtonColor: '#6c757d'
      }).then((rpta) => {
        if (rpta.isConfirmed) {
          Redirigir("/iniciar-sesion")
        } else if (rpta.isDenied) {
          Redirigir("/registrate")
        }
      })
      return;
    }

    const token = usuario?.jwt;
    for (const libro of allProducts) {
      const ventaData = {
        data: {
          titulo: libro.titulo,
          cantidad: libro.cantidad,
          precio_unitario: libro.precio,
          precio_total: libro.precio * libro.cantidad,
          direccion,
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
    Swal.fire({
      icon: 'success',
      title: '¡Compra registrada!',
      text: 'Tu compra se ha realizado',
      confirmButtonText: 'Aceptar'
    })
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
                        <span>S/.{libro.precio.toFixed(2)}</span>
                        <div className="count">
                          <button className="minus" onClick={() => onMinus(libro)}>-</button>
                          <span className="quantity"> {libro.cantidad} </span>
                          <button className="plus" onClick={() => onAdd(libro)}>+</button>
                        </div>
                        <button className="delete" onClick={() => onDeleteProduct(libro)}>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="buy-books">
                  <p>Subtotal: S/. {total.toFixed(2)}</p>
                  {/*Formulario para Direccion*/}
                  <form className="direction" onSubmit={handleSubmit}>
                    <p>Direccion de envio</p>
                    <div className="region">
                      <div className="specific-region">
                        <label for="departamento" className="title-input-name">Departamento</label>
                        <select name="departamento" id="departamento" className="selector-option">
                          <option value="Lima">Lima</option>
                        </select>
                      </div>
                    </div>

                    <div className="specific-direction">
                      <label for="street" className="title-input-name">Direccion de calle</label>
                      <input type="text" id="street" name="street" className="container-input" ref={direccionRef} placeholder="Av. Arequipa 123, Lima" required />

                      {/* Botón para validar dirección */}
                      <button type="submit" className="validar-direccion">Validar dirección</button>

                      {/*Mostrar el mapa si la direccion es valida*/}
                      {coordenadas && <Mapa lat={coordenadas.lat} lon={coordenadas.lon} />}
                    </div>
                    {/*Finalizar Compra*/}
                  </form>
                  <button className="comprar" onClick={finalizarCompra}>Realizar compra</button>
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

