package alberto.arias.eventos.Services;

import alberto.arias.eventos.Modelos.Evento;
import alberto.arias.eventos.Repositories.EventoRepository;
import alberto.arias.eventos.Repositories.UsuarioRepository;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {
    @Autowired
    EventoRepository eventoRepository;

    public ResponseEntity<Respuesta> crearEvento(Evento evento) {
        Respuesta respuesta = new Respuesta();
        Evento even = eventoRepository.save(evento);
        respuesta.setData(even);
        respuesta.setCodigo(HttpStatus.OK.value());
        respuesta.setMensaje("Tarea creada correctamente");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    public List<Evento> listaEventos() {
        return eventoRepository.findAll();
    }
}
