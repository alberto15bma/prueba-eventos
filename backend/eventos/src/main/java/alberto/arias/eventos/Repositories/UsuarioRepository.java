package alberto.arias.eventos.Repositories;

import alberto.arias.eventos.Modelos.Usuario;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Usuario findByUsuario(String usuario);
}
