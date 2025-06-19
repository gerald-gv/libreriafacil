import React from "react";
import "../estilos/formularios.css"
const RecuperarCuenta = () => {
  return (
    <div>
        <main>
          <section>
            <div className="font-content-form">
              <h1>Recuperación de cuenta</h1>
              <p>Por favor introduzca su dirección de correo electrónico para recibir un enlace de restablecimiento de contraseña.</p>
              <div className="content-form">
                <form className="register">
                  <label htmlFor="Email" className="title-input-name">Correo electrónico <span>*</span></label>
                  <input type="email" name="name" id="Email" class="input-container" required/>
                  <div className="submit">
                    <input type="submit" value="Enviar solicitud"/>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
    </div>
  )
}

export default RecuperarCuenta

