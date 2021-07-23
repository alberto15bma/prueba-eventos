package alberto.arias.eventos.Services;

import alberto.arias.eventos.Modelos.Usuario;
import alberto.arias.eventos.Repositories.UsuarioRepository;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    public ResponseEntity<Respuesta> login(Usuario user){
       // Usuario suario = usuarioRepository.findByUsuario(user.getUsuario());
        return null;
    }
}
