package alberto.arias.eventos.Repositories;

import alberto.arias.eventos.Modelos.Evento;
import alberto.arias.eventos.Modelos.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromocionRepository extends JpaRepository<Promocion, Integer> {
}
