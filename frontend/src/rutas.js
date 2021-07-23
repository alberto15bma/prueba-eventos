
import React from 'react'
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable'
import App from './App'


const loadable = loader =>{
  console.log(loader)
  return Loadable({
    loader,
    loading: () => <div>Cargando...</div>,
    delay: 300
  })
}
  


const ruta = [
    {
        path: '/evento',
        component: loadable(() => import('./components/evento')),
        exact: true,
      },
      {
        path: '/login',
        component: loadable(() => import('./components/login')),
        exact: true,
      },

];
class Rutas extends React.Component {
    render() {
      return (
          <BrowserRouter>         
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/evento" />} />
                {ruta.map(route => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={route.path}
                    exact={route.exact}
                  />
                ))}
              </Switch>
             
          </BrowserRouter>
      )
    }
  }
  
  export default Rutas