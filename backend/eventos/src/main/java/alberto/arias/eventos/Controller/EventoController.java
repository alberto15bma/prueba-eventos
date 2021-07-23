package alberto.arias.eventos.Controller;

import alberto.arias.eventos.Modelos.Evento;
import alberto.arias.eventos.Modelos.Usuario;
import alberto.arias.eventos.Services.EventoService;
import alberto.arias.eventos.Services.UsuarioService;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class EventoController {
    @Autowired
    EventoService eventoService;

    @PostMapping(path = "/evento/crear")
    public ResponseEntity<Respuesta> crearEvento(@RequestBody Evento evento){
        return eventoService.crearEvento(evento);
    }
    @GetMapping(path = "/evento/listar")
    public List<Evento> getEventos() {
        return eventoService.listaEventos();
    }
}
