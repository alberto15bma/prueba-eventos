package alberto.arias.eventos.Modelos;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String nombre;
    private String usuario;
    private String password;
    private String rol;
    private Timestamp fecha_creacion;
}
