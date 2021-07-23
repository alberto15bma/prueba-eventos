package alberto.arias.eventos.Services;

import alberto.arias.eventos.Modelos.Usuario;
import alberto.arias.eventos.Repositories.UsuarioRepository;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    public ResponseEntity<Respuesta> login(Usuario user){
        Respuesta respuesta = new Respuesta();
        Usuario usuario = usuarioRepository.findByUsuario(user.getUsuario());
        if (usuario != null){
            if (usuario.getPassword().equals(user.getPassword())){
                respuesta.setData(usuario);
                respuesta.setCodigo(HttpStatus.OK.value());
                respuesta.setMensaje("Usuario encontrado");
                return new ResponseEntity<>(respuesta, HttpStatus.OK);
            }
        }
        respuesta.setData(null);
        respuesta.setCodigo(HttpStatus.OK.value());
        respuesta.setMensaje("Credenciales incorrectas");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
