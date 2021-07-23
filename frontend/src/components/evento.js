import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import TreeView from 'devextreme-react/tree-view';
import Button from 'devextreme-react/button';
import Popup from 'devextreme-react/popup';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import DateBox from 'devextreme-react/date-box';
import SelectBox from 'devextreme-react/select-box';
import { Toast } from 'devextreme-react/toast';
import DataGrid, { Column, SearchPanel, ColumnFixing, Pager, FilterRow } from 'devextreme-react/data-grid';
import {NavLink} from 'react-router-dom';
import app from '../config';
import apis from '../apis';
import constantes from '../constantes';
import store from 'store'
import { Center } from 'devextreme-react/map'
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
            orientation: 'horizontal',
            submenuDirection: 'auto',
            hideSubmenuOnMouseLeave: false,
            currentProduct: null,
            contador_tarea : 0,
            titulo_modal: "Agregar tarea",
            visible_modal:false,
            activar_combo:true,
            fecha_actual: new Date(),
            titulo: "",
            descripcion:"",
            fecha_fin:"",
            estado:"",
            focusFila:0,
            tarea_id:0,
            estado_id: 1,
            activar_edicion:true,
            activar_guardar:false,
            tarea_seleccion: null,
            estados_tareas: [],
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
            tarea_id:0,
            titulo: "", 
            descripcion: "", 
            fecha_fin: "", 
            estado: "", 
            estado_tarea: null,
            estado_id: 1,
            fecha_creacion: new Date(),
            usuarios:null,
            visible_modal:false,
            focusFila:0,
            activar_edicion: true
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
        const {titulo, fecha_fin} = this.state;
        if(titulo.length === 0 || fecha_fin.length === 0){
            this.mostrarNotificacion(constantes.error, constantes.error_campos);
            return false;
        }
        return true;;
    }


    guardarTarea = async (e) => {
        if(this.validarData()) {
            const {titulo, descripcion, fecha_fin, estado_id, usuario_id, tipo_dialogo} = this.state;
            let parametros = { 
                titulo, 
                descripcion, 
                fecha_fin,  
                estado_tarea: {id: estado_id},
                usuario_id,
                fecha_creacion: new Date(),
                //tarea_id: 1,
                usuarios: {id: usuario_id}  
            }
            if(tipo_dialogo === 1){         
                let res = await app.consulta(apis.crear_tarea, parametros);
                this.limpiarData();
                this.cargarEventos(this.state.usuario_id);
                if(res != null){        
                this.mostrarNotificacion(constantes.success, constantes.guardado_correctamente);
                }else {
                    this.mostrarNotificacion(constantes.error, constantes.error_guardar);
                }
            }else {
                console.log(fecha_fin)
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
    cambiarTitulo = (e) => this.setState({titulo: e.value})
    cambiarDescripcion = (e) => this.setState({descripcion: e.value})
    cambiarFecha = (e) => this.setState({fecha_fin: e.value})


    onFocusedRowChanged = (e) => {
        let data = e.selectedRowsData[0]
        this.setState({         
            tarea_seleccion: data,
            //focusFila: e.component.option('focusedRowKey'),
            activar_edicion: data.estado_tarea.id === 4 ? true : false,
            titulo: data.titulo,
            descripcion: data.descripcion,
            fecha_fin: data.fecha_fin,
            estado_id: data.estado_tarea.id,
            tarea_id: data.id
        });
        
        console.log(e.selectedRowsData[0])
    }

    colorEstado = (e) => {
        return <div style={{background: e.value.color, color:"#fff", textAlign:"center", padding:"3px 10px", borderRadius:"5px", fontWeight: "bold"}}>{e.value.nombre}</div>
    }
    comboEstados = (e) => {
        return <div style={{display:"flex", alignItems:"Center"}}>
            <div style={{background: e.color, width:"30px", height:"30px", marginRight:"10px"}}></div>
            <div>{e.nombre}</div>
        </div>
    }

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
                                <Button text="Modificar" disabled={this.state.activar_edicion} type="normal" onClick={() => this.abrirModalEvento("editar")}/>
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
                                <Button text="Modificar" disabled={this.state.activar_edicion} type="normal" onClick={() => this.abrirModal("editar")}/>
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
                              <TextBox className="dx-field-value" width= "100%" name="titulo" valueChangeEvent="keyup" value={this.state.titulo} onValueChanged={this.cambiarTitulo.bind()} placeholder="Nombre" />
                            </div>
                            <div className="dx-field">                         
                              <TextBox className="dx-field-value" width= "100%" name="titulo" valueChangeEvent="keyup" value={this.state.titulo} onValueChanged={this.cambiarTitulo.bind()} placeholder="Empresario" />
                            </div>
                            <div className="dx-field">
                                <TextBox className="dx-field-value" width= "100%" placeholder="Cantidad de entradas" name="titulo" valueChangeEvent="keyup" value={this.state.titulo} onValueChanged={this.cambiarTitulo.bind()} />
                            </div>
                            <div className="dx-field">
                                <TextBox className="dx-field-value" width= "100%" placeholder="Precio" name="titulo" valueChangeEvent="keyup" value={this.state.titulo} onValueChanged={this.cambiarTitulo.bind()} />
                            </div>
                            <div className="dx-field">
                                <DateBox width={"100%"} defaultValue={this.state.fecha_actual} valueChangeEvent="keyup" value={this.state.fecha_fin} placeholder="Fecha" onValueChanged={this.cambiarFecha.bind()} type="date" displayFormat="dd/MM/yyyy" />
                            </div>
                            <div className="dx-field">
                                <div className="dx-field-label">Tipo:</div>
                                <div className="dx-field-value">
                                        <SelectBox dataSource={this.state.tipo} width={"100%"} onValueChanged={this.seleccionEstado}  value={this.state.estado_id} placeholder="Seleccione" />
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div className="div_botones_modal">
                        <Button text={this.state.texto_boton} width={110}  type="default" onClick={() => this.guardarTarea()}/>
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