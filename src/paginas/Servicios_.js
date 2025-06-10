import React from 'react';
import { Link } from 'react-router-dom';
import NavMenu from '../elementos/NavMenu';
import Footer from '../elementos/Footer';
import Fecha from '../elementos/Fecha';
import Hora from '../elementos/Hora';
import '../estilos/servicios.css';

const Servicios = () => {
  return (
    <>
      <header className="header">
        <NavMenu />
          <div className="info-datetime">
            <Fecha />
            <Hora />
          </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <section className="detalle-servicios container">
          <h2>¿Por qué elegir Librería Fácil?</h2>
          <div className="tarjetas-servicio">
            <div className="tarjeta">
              <i className="fas fa-book"></i>
              <h4>Amplia Colección</h4>
              <p>Tenemos libros de todos los géneros: literatura, ciencia, autoayuda, infantiles y más.</p>
            </div>
            <div className="tarjeta">
              <i className="fas fa-shipping-fast"></i>
              <h4>Envío Rápido</h4>
              <p>Realizamos envíos a todo el país en menos de 48 horas.</p>
            </div>
            <div className="tarjeta">
              <i className="fas fa-sync-alt"></i>
              <h4>Garantía de Satisfacción</h4>
              <p>Si el libro no es lo que esperabas, puedes devolverlo sin costo dentro de los 7 días.</p>
            </div>
          </div>
        </section>

        <section className="faq container">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-item">
            <h4>¿Los libros son nuevos?</h4>
            <p>Sí, todos nuestros libros son nuevos y en perfectas condiciones.</p>
          </div>
          <div className="faq-item">
            <h4>¿Puedo pagar al recibir?</h4>
            <p>Sí, aceptamos pago contra entrega en zonas disponibles.</p>
          </div>
          <div className="faq-item">
            <h4>¿Tienen libros digitales?</h4>
            <p>Por ahora solo ofrecemos libros físicos, pero pronto incluiremos ebooks.</p>
          </div>
        </section>

        <section className="confianza container">
          <h2>Compra con Confianza</h2>
          <div className="sellos">
            <div className="sello">
              <i className="fas fa-lock"></i>
              <p>Pago Seguro</p>
            </div>
            <div className="sello">
              <i className="fas fa-user-check"></i>
              <p>Autenticidad Garantizada</p>
            </div>
            <div className="sello">
              <i className="fas fa-book-open"></i>
              <p>Variedad de Títulos</p>
            </div>
          </div>
        </section>
      </header>

      <main className="services">
        <div className="services-content container">
          <h2 id="coleccion">¿Cómo comprar un libro?</h2>
          <div className="services-group">
            <div className="services-1">
              <i className="fas fa-search"></i>
              <h3>Paso 1: Explora</h3>
              <p>Busca por título, autor o género en nuestro catálogo actualizado.</p>
            </div>
            <div className="services-1">
              <i className="fas fa-credit-card"></i>
              <h3>Paso 2: Compra</h3>
              <p>Elige tu forma de pago: tarjeta, Yape, Plin o contra entrega.</p>
            </div>
            <div className="services-1">
              <i className="fas fa-box"></i>
              <h3>Paso 3: Recibe</h3>
              <p>Te entregamos el libro en casa o punto de recojo en menos de 2 días.</p>
            </div>
          </div>
          <p className="info-text">
            ¡Descubre tu próxima gran lectura con nosotros!
          </p>
          <br />
          <Link to="/" className="btn-1">Ver Libros</Link>
        </div>

        {/* Proceso de Compra Visual */}
        <section className="proceso-compra container">
          <h2>¿Cómo funciona el proceso de compra?</h2>
          <div className="pasos">
            <div className="paso">
              <i className="fas fa-search"></i>
              <h4>1. Encuentra tu libro</h4>
              <p>Explora nuestro catálogo por género, autor o título.</p>
            </div>
            <div className="paso">
              <i className="fas fa-shopping-cart"></i>
              <h4>2. Añádelo al carrito</h4>
              <p>Agrega uno o varios libros y revisa tu pedido.</p>
            </div>
            <div className="paso">
              <i className="fas fa-credit-card"></i>
              <h4>3. Paga seguro</h4>
              <p>Usa tarjeta, Yape, Plin o paga al recibir.</p>
            </div>
            <div className="paso">
              <i className="fas fa-box-open"></i>
              <h4>4. Recíbelo en casa</h4>
              <p>Envío rápido y seguimiento garantizado.</p>
            </div>
          </div>
        </section>

        {/* Promociones o Beneficios */}
        <section className="promociones container">
          <h2>Beneficios y Promociones</h2>
          <div className="beneficios">
            <div className="beneficio">
              <i className="fas fa-gift"></i>
              <h4>10% en tu primera compra</h4>
              <p>Solo por registrarte, recibe un cupón de descuento.</p>
            </div>
            <div className="beneficio">
              <i className="fas fa-truck"></i>
              <h4>Envío gratis desde S/ 100</h4>
              <p>Disponible en Lima Metropolitana.</p>
            </div>
            <div className="beneficio">
              <i className="fas fa-star"></i>
              <h4>Cliente frecuente</h4>
              <p>Obtén puntos por cada compra y canjéalos por libros.</p>
            </div>
          </div>
        </section>

        {/* Políticas de Servicio */}
        <section className="politicas container">
          <h2>Nuestras Políticas</h2>
          <ul className="lista-politicas">
            <li><strong>Devoluciones:</strong> Puedes devolver cualquier libro dentro de los 7 días.</li>
            <li><strong>Pago seguro:</strong> Contamos con pasarelas cifradas para tu tranquilidad.</li>
            <li><strong>Privacidad:</strong> Tus datos personales están protegidos y no se comparten.</li>
            <li><strong>Autenticidad:</strong> Todos nuestros libros son originales y nuevos.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Servicios;
