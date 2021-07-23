package alberto.arias.eventos.Modelos;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String usuario;
    private String password;
    private String rol;
    @Column(name = "fecha_creacion")
    private Timestamp fechaCreacion;
}
