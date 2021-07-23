
import React, { Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import store from 'store'
class App extends React.PureComponent {

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }


  render() {
    const Vista = () => {
      let sesion = store.get(`sesion`)
      if(sesion === undefined){
        return <Redirect to="/login" />
      }else {
        return <Redirect to="/inicio" />
      }
      return <div>hola</div>;
    }

    
    return (
      <Fragment>
           {Vista()}
      </Fragment>
    );
  }
}

export default withRouter(App);
