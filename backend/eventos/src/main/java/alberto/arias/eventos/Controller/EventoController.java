package alberto.arias.eventos.Controller;

import alberto.arias.eventos.Modelos.Evento;
import alberto.arias.eventos.Modelos.Usuario;
import alberto.arias.eventos.Services.EventoService;
import alberto.arias.eventos.Services.UsuarioService;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventoController {
    @Autowired
    EventoService eventoService;

    @PostMapping(path = "/evento/crear")
    public ResponseEntity<Respuesta> login(@RequestBody Evento evento){
        return eventoService.crearEvento(evento);
    }
}
