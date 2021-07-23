package alberto.arias.eventos.Controller;

import alberto.arias.eventos.Modelos.Evento;
import alberto.arias.eventos.Modelos.Promocion;
import alberto.arias.eventos.Services.EventoService;
import alberto.arias.eventos.Services.PromocionService;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class PromocionController {
    @Autowired
    PromocionService promocionService;

    @PostMapping(path = "/promocion/crear")
    public ResponseEntity<Respuesta> crearPromocion(@RequestBody Promocion promocion){
        return promocionService.crearPromocion(promocion);
    }
    @GetMapping(path = "/promocion/listar")
    public List<Promocion> getEventos() {
        return promocionService.listaPromocion();
    }
}
