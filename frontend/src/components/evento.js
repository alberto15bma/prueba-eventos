import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Button from 'devextreme-react/button';
import Popup from 'devextreme-react/popup';
import TextBox from 'devextreme-react/text-box';
import DateBox from 'devextreme-react/date-box';
import SelectBox from 'devextreme-react/select-box';
import { Toast } from 'devextreme-react/toast';
import { NumberBox } from 'devextreme-react/number-box';
import app from '../config';
import apis from '../apis';
import constantes from '../constantes';
import store from 'store'
import Header from './header';;

const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format;
 class Evento extends Component {
    
    
    constructor(props) {
        super(props);
        this.state= {
            eventos: [],
            promociones:[],
            tipo: ["Publico", "Privado"],
            usuario_id: 0,
            contador_tarea : 0,
            titulo_modal: "Agregar tarea",
            visible_modal:false,
            fecha_actual: new Date(),
            estado:"",
            nombre_evento:"",
            empresario:"",
            cantidad_entradas:"",
            precio:"",
            fecha_evento: "",
            tipo_evento:"",
            activar_edicion:true,
            activar_guardar:false,
            texto_boton:"Guardar",
            visible_notificacion: false,
            mensaje_notificacion:"",
            tipo_notificacion:"",
            usuario_login:"",
        }
        this.menu = [
            {id:'1', text:"Tareas", selected: true},
            {id:'2', text:"Historial"}
        ]
    }
    
    componentDidMount() {
        let data = store.get("data");
        if(data !== undefined){
            this.setState({usuario_id: data.id, usuario_login: data.nombre+" "+data.apellido});
            this.cargarEventos();
            this.cargarPromocion();
        } 
    }

    cargarEventos = async () => {
        let res = await app.consulta(apis.lista_eventos, null, app.metodo.GET);
        console.log(res);
        if(res !== null)
            this.setState({eventos: res})
    }
    cargarPromocion = async () => {
        let res = await app.consulta(apis.lista_promocion, null, app.metodo.GET);
        console.log(res);
        if(res !== null)
            this.setState({promociones: res})
    }



    itemClick(e) {
        debugger
        if(e.itemData.price) {
          this.setState({
            currentProduct: e.itemData
          });
        }
      }
      renderPanelItemTitle(item) {
        return <span className="tab-panel-title">{item.text}</span>;
    }

    abrirModalEvento = (e) => {
        if(e === "crear") {
            this.limpiarData();
            this.setState({titulo_modal: "Crear Evento", visible_modal:true, activar_combo: true, estado_id:1, texto_boton:"Guardar", tipo_dialogo:1})
        }else {
            this.setState({titulo_modal: "Modificar Evento", visible_modal:true, activar_combo: false, texto_boton:"Modificar", tipo_dialogo:2})
        }
    }

    limpiarData = () => {
        this.setState({
            nombre_evento: "", 
            empresario: "", 
            fecha_evento: "", 
            precio: "", 
            cantidad_entradas: "",
            tipo_evento: "",
            activar_edicion: true,
            visible_modal:false
        })
    }

    mostrarNotificacion = (tipo, mensaje) => {
        this.setState({
            visible_notificacion:true,
            mensaje_notificacion:mensaje,
            tipo_notificacion: tipo
        })
    }

    validarData = () => {
        const {nombre_evento, empresario, fecha_evento, precio, cantidad_entradas, tipo_evento} = this.state;
        if(nombre_evento.length === 0 
            || empresario.length === 0 
            || fecha_evento.length === 0
            || precio.length === 0
            || cantidad_entradas.length === 0
            || tipo_evento.length === 0){
            this.mostrarNotificacion(constantes.error, constantes.error_campos);
            return false;
        }
        return true;;
    }


    guardarEvento = async (e) => {
        if(this.validarData()) {
            const {nombre_evento, empresario, fecha_evento, precio, cantidad_entradas, tipo_evento, tipo_dialogo} = this.state;
            let parametros = { 
                nombre: nombre_evento, 
                empresario, 
                fecha: fecha_evento,  
                precio,
                tipo: tipo_evento,
                cantidadEntradas: cantidad_entradas,
                estado: "Activo"
            }
            if(tipo_dialogo === 1){         
                let res = await app.consulta(apis.crear_evento, parametros);
                this.limpiarData();
                this.cargarEventos();
                if(res != null){        
                this.mostrarNotificacion(constantes.success, constantes.guardado_correctamente);
                }else {
                    this.mostrarNotificacion(constantes.error, constantes.error_guardar);
                }
            }else {
                
                parametros.id = this.state.tarea_id;
                let res = await app.consulta(apis.modificar_tarea, parametros);
                this.limpiarData();
                this.cargarEventos(this.state.usuario_id);
                if(res != null){
                this.mostrarNotificacion(constantes.success, constantes.modificado_correctamente);
                }else {
                    this.mostrarNotificacion(constantes.error, constantes.error_modificar);
                }
            } 
        }
 }
    cambiarNombreEvento = (e) => this.setState({nombre_evento: e.value})
    cambiarEmpresario = (e) => this.setState({empresario: e.value})
    cambiarFechaEvento = (e) => this.setState({fecha_evento: e.value})
    cambiarPrecio = (e) => this.setState({precio: e.value})
    cambiarCantidadEntradas = (e) => this.setState({cantidad_entradas: e.value})
    cambiarTipoEvento = (e) => this.setState({tipo_evento: e.value})


    seleccionEstado = (e) => {
        this.setState({estado_id: e.value})
    }
   existePromocion = (e) => {
    const {promociones} = this.state;
    return promociones.map(p=> {
      return  p.eventos.map(evento =>{           
            if(evento.id === e.id){
                console.log(evento)
                return (
                    <div id={`house${e.id}`} key={evento.id}>
                        <img src="https://w7.pngwing.com/pngs/881/716/png-transparent-promotion-advertising-price-service-vibbo-promocion-leaf-text-service-thumbnail.png" />
                        {p.porcentaje}%
                    </div>
                )
            }else {
                return "";
            }
        })
    })   
   }

    render() {
        const Vista = () => {
            let sesion = store.get(`sesion`)
            if(sesion === undefined){
                return <Redirect to="/login" />
            }
            let {promociones, tareas} = this.state;
            return <section className="main_general">
                <div className="container">
                    <div className="">
                    <div className="contenedor">
                        <div className="div_header">
                            <span>Total Eventos {this.state.eventos.length}</span>
                            <div>
                                <span className="espacio_horizontal"></span>
                                <Button text="Nuevo evento" disabled={this.state.activar_guardar} type="default" onClick={() => this.abrirModalEvento("crear")}/>
                            </div>
                            
                        </div>
                        
                        <div className="tabla_contenido">
                            <div className="contenido_eventos">
                                <div className="images">
                                        {
                                        this.state.eventos.map((e) =>
                                        <div key={e.id}>
                                        <div onClick={this.show} className="item-content">
                                        <img src={"https://miro.medium.com/max/1400/1*vxjAHkrXbGG6gOiPZgjeZA.jpeg"} />                                                   
                                          <div className="item-options">
                                            <div>
                                              <div className="address">{e.nombre}</div>
                                              <div className="price large-text">{formatCurrency(e.precio)}</div>
                                              <div className="agent">
                                              {this.existePromocion(e)}                       
                                              </div>                                                           
                                            </div>
                                          </div>                                       
                                        </div>
                                      </div>
                                        )
                                        }
                                       
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor">
                        <div className="div_header">
                            <span>Total Promociones {promociones.length}</span>
                            <div>
                                <span className="espacio_horizontal"></span>
                                <Button text="Nueva promoción" disabled={this.state.activar_guardar} type="default" onClick={() => this.abrirModal("crear")}/>
                            </div>
                            
                        </div>
                        
                        <div className="tabla_contenido">
                            <div className="contenido_eventos">
                                <div className="images">
                                        {
                                        promociones.map((e) =>
                                        <div key={e.id}>
                                        <div onClick={this.show} className="item-content">
                                        <img src={"https://w7.pngwing.com/pngs/881/716/png-transparent-promotion-advertising-price-service-vibbo-promocion-leaf-text-service-thumbnail.png"} />                                                   
                                          <div className="item-options">
                                            <div>
                                              <div className="address">{e.nombre}</div>
                                              <div className="agent">
                                                                    
                                              </div>                                                           
                                            </div>
                                          </div>                                       
                                        </div>
                                      </div>
                                        )
                                        }
                                       
                                    </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <Toast
                    visible={this.state.visible_notificacion}
                    width={500}
                    message={this.state.mensaje_notificacion}
                    type={this.state.tipo_notificacion}      
                    onHiding={() => this.setState({visible_notificacion: false})}           
                    displayTime={1500}
                />
                <Popup
                    width={360}
                    height={440}
                    showTitle={true}
                    title={this.state.titulo_modal}
                    dragEnabled={false}
                    closeOnOutsideClick={false}
                    showCloseButton={false}
                    visible={this.state.visible_modal}
                    onHiding={this.handlePopupHidden}
                    contentRender={this.renderPopup}
                    >

                    <div className="form">

                        <div className="dx-fieldset">
                        <div className="dx-field">                         
                              <TextBox className="dx-field-value" width= "100%" valueChangeEvent="keyup" value={this.state.nombre_evento} onValueChanged={this.cambiarNombreEvento.bind()} placeholder="Nombre" />
                            </div>
                            <div className="dx-field">                         
                              <TextBox className="dx-field-value" width= "100%" valueChangeEvent="keyup" value={this.state.empresario} onValueChanged={this.cambiarEmpresario.bind()} placeholder="Empresario" />
                            </div>
                            <div className="dx-field">                           
                                <NumberBox
                                value={this.state.cantidad_entradas}
                                placeholder="Cantidad de entradas"
                                showSpinButtons={true}
                                onKeyDown={this.keyDown}
                                onValueChanged={this.cambiarCantidadEntradas.bind()}
                                width= "100%" 
                            />             

                            </div>
                            <div className="dx-field">
                            <NumberBox
                                value={this.state.precio}
                                showSpinButtons={true}
                                onKeyDown={this.keyDown}
                        
                                onValueChanged={this.cambiarPrecio.bind()}
                                width= "100%" ali placeholder="Precio"
                            />              
                            </div>
                            <div className="dx-field">
                                <DateBox width={"100%"} defaultValue={this.state.fecha_evento} valueChangeEvent="keyup" value={this.state.fecha_evento} placeholder="Fecha" onValueChanged={this.cambiarFechaEvento.bind()} type="date" displayFormat="dd/MM/yyyy" />
                            </div>
                            <div className="dx-field">
                                <div className="dx-field-label">Tipo:</div>
                                <div className="dx-field-value">
                                        <SelectBox dataSource={this.state.tipo} width={"100%"} onValueChanged={this.cambiarTipoEvento}  value={this.state.tipo_evento} placeholder="Seleccione" />
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div className="div_botones_modal">
                        <Button text={this.state.texto_boton} width={110}  type="default" onClick={() => this.guardarEvento()}/>
                        <div className="espacio_horizontal"></div>
                        <Button text="Cancelar"  width={110}   type="normal" onClick={() => this.setState({visible_modal:false})}/>
                    </div>

                </Popup>
            </section>;
          }
          return (
            <Fragment>
                <Header />
                 {Vista()}
            </Fragment>
          );
      }
}
export default Evento; 