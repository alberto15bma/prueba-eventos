package alberto.arias.eventos.Services;

import alberto.arias.eventos.Modelos.Evento;
import alberto.arias.eventos.Modelos.Promocion;
import alberto.arias.eventos.Repositories.EventoRepository;
import alberto.arias.eventos.Repositories.PromocionRepository;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PromocionService {

    @Autowired
    PromocionRepository promocionRepository;

    public ResponseEntity<Respuesta> crearPromocion(Promocion promocion) {
        Respuesta respuesta = new Respuesta();
        Promocion promo = promocionRepository.save(promocion);
        respuesta.setData(promo);
        respuesta.setCodigo(HttpStatus.OK.value());
        respuesta.setMensaje("Promoción creada correctamente");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

}
