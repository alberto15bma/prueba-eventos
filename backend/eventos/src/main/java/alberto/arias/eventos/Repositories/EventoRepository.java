package alberto.arias.eventos.Repositories;

import alberto.arias.eventos.Modelos.Evento;
import alberto.arias.eventos.Modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
}
