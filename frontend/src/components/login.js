import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import { Toast } from 'devextreme-react/toast';
import app from '../config';
import apis from '../apis';
import constantes from '../constantes';
import store from 'store'
class Login extends Component {
    constructor() {
        super();
        this.state = {
          usuario: "",
          password: "",
          disabled: "disabled",
          valor_boton: "Iniciar sesión",
          loading: true
        };
      }

      eventoEscribir = e => {
          debugger
        if (e.target.name === "usuario") {
          this.setState({
            usuario: e.target.value
          });
        } else {
          this.setState({
            password: e.target.value
          });
        }
      };

      iniciarSesion = async () => {
        const {usuario, password} = this.state;
        if(usuario.length === 0){
            this.mostrarNotificacion(constantes.error, constantes.error_agregar_usuario);
            return;
        }
        if(password.length === 0){
            this.mostrarNotificacion(constantes.error, constantes.error_agregar_password);
            return;
        }
        let parametros = {usuario, password};
        let login = await app.consulta(apis.login, parametros);
        console.log(login)
        if(login.data){
            store.set("sesion", true);
            store.set("data", login.data)
            window.location.href = "/evento";
        }else {
           this.mostrarNotificacion(constantes.error, constantes.credecinales_incorrectas);
        }

      };
      mostrarNotificacion = (tipo, mensaje) => {
        this.setState({
            visible_notificacion:true,
            mensaje_notificacion:mensaje,
            tipo_notificacion: tipo
        })
    }
  render() {
    const Vista = () => {
        let sesion = store.get(`sesion`)
        if(sesion !== undefined){
            return <Redirect to="/evento" />
        }
        return (<div>
            <section className="contenedor_login">
                <div className="titulo_login">Login</div>
                <div className="contenedor_input">
                    <input type="text" placeholder="Usuario" name="usuario" id="usuario" value={this.state.usuario} autoComplete={"off"}
                        onChange={this.eventoEscribir} />
                </div>
                <div className="contenedor_input">
                    <input type="password" placeholder="Contraseña" name="password" id="password" value={this.state.password} autoComplete={"off"}
                        onChange={this.eventoEscribir}  />
                </div>
                <div className="contenedor_input">
                  <Button width="100%" text="Iniciar sesión"  type="default" onClick={() => this.iniciarSesion()}
                />
                </div>
                <Toast
                    visible={this.state.visible_notificacion}
                    width={500}
                    message={this.state.mensaje_notificacion}
                    type={this.state.tipo_notificacion}      
                    onHiding={() => this.setState({visible_notificacion: false})}           
                    displayTime={1500}
                />
            </section>
        </div>);
      }
      return (
        <Fragment>
             {Vista()}
        </Fragment>
      );
  }
}
export default Login