package alberto.arias.eventos.Modelos;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name="evento")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private Date fecha;
    private String empresario;
    private String tipo;
    private double precio;
    private Integer cantidadEntradas;
    private String Estado;
}
