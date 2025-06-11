import React from "react";
import NavMenu from "../elementos/NavMenu"
import Footer from "../elementos/Footer"
import { Link } from "react-router-dom";
import "../estilos/formularios.css"
const IniciarSesion = () => {
  return (
    <div>
        <NavMenu />
        <main>
          <section>
            <div className="font-content-form">
              <div className="content-form">
                <h1>Inicio de sesión</h1>
                <form>
                  <label for="Email" className="title-input-name">Correo electrónico <span>*</span></label>
                  <input type="email" name="name" id="Email" class="input-container" required/>
                  <label for="password" className="title-input-name">Contraseña <span>*</span></label>
                  <input type="password"id="password" class="input-container" required/>
                  <Link to="/recuperar-cuenta" className="forgot-password">¿Olvidaste tu contraseña?</Link>
                  <div className="submit">
                    <input type="submit" value="Iniciar sesion"/>
                    <p>¿Aun no estas registrado?</p>
                    <Link to="/registrate" className="second-button">Crear cuenta</Link>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer />
    </div>
  )
}

export default IniciarSesion

