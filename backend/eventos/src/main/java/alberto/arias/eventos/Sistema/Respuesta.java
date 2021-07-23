package alberto.arias.eventos.Sistema;

import lombok.Data;

@Data
public class Respuesta {
    private int codigo;
    private String mensaje;
    private Object data;
}
