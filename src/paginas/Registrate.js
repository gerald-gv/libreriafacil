import React from "react";
import NavMenu from "../elementos/NavMenu"
import Footer from "../elementos/Footer"
import "../estilos/formularios.css"
const Registrate = () => {
  return (
    <div>
        <NavMenu />
        <main>
          <section>
            <div className="font-content-form">
              <div className="content-form">
                <h1>Registro</h1>
                <form className="register">
                  <label for="Nombre" className="title-input-name">Nombre de usuario <span>*</span></label>
                  <input type="text" name="name" id="Nombre" class="input-container" required/>
                  <label for="Email" className="title-input-name">Correo electrónico <span>*</span></label>
                  <input type="email" name="name" id="Email" class="input-container" required/>
                  <label for="new-password" className="title-input-name">Contraseña <span>*</span></label>
                  <input type="password" name="name" id="new-password" class="input-container" required/>
                  <label for="password" className="title-input-name">Confirmar contraseña <span>*</span></label>
                  <input type="password" name="name" id="password" class="input-container" required/>
                  <div className="submit">
                    <input type="submit" value="Crear cuenta"/>
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

export default Registrate

