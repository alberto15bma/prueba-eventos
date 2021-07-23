

const app = {
    url: "http://192.168.100.9:5050",
    metodo:{
      POST: "POST",
      GET:"GET",
    },
    apis: function(p) {
      return this.url+"/"+p
    },

    consulta : function(ruta, parametros = null, method = "POST") {
      return new Promise((resolve, reject) => {
          
          const url = this.apis(ruta);
          const headers = new Headers();
          headers.append("Accept", "application/json");
          headers.append("Content-Type", "application/json");
              
          fetch(url, {
            method,
            headers,
            body: parametros == null ? parametros : JSON.stringify(parametros)
          })
            .then(res => res.json())
            .then(resJson => {
              resolve(resJson);
            })
            .catch(err => {
              reject(err);
            });
        });
  },
 

}

export default app;