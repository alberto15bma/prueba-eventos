package alberto.arias.eventos.Controller;

import alberto.arias.eventos.Modelos.Usuario;
import alberto.arias.eventos.Repositories.UsuarioRepository;
import alberto.arias.eventos.Services.UsuarioService;
import alberto.arias.eventos.Sistema.Respuesta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @PostMapping(path = "/login")
    public ResponseEntity<Respuesta> login(@RequestBody Usuario usuario){
        return usuarioService.login(usuario);
    }

}
