package backend.server.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiException extends RuntimeException {

    private HttpStatus status;
    private String message;
    private Long code;

    public ApiException(HttpStatus status, String message, Long code) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

}
