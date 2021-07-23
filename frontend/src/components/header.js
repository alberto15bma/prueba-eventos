import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Button from 'devextreme-react/button';
import store from 'store'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state= {
            usuario_id: 0,           
            usuario_login:"",
        }    
    }   
    componentDidMount() {
        let data = store.get("data");
        if(data !== undefined){
            this.setState({usuario_id: data.id, usuario_login: `${data.nombre} (${data.rol})`});
        }      
    }
    cerrarSesion = () => {
        store.remove("sesion");
        store.remove("data");
        window.location.href = "/login"
    }
  render() {
    return (
        <header className="header_principal">
        <nav>
            <div>
            <NavLink to="/evento" activeClassName="selected">Eventos</NavLink>                      
            </div>
            <div>
            <NavLink to="#">{this.state.usuario_login}</NavLink> 
                <Button text="Cerrar sesión"   type="default" onClick={() => this.cerrarSesion()}/>  
            </div>
        </nav>
    </header>
    );
  }
}

export default Header;