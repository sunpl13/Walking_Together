package backend.server.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handler(ApiException e) {
        Map<String, Object> resBody = new HashMap<>();
        resBody.put("message", e.getMessage());
        resBody.put("code",e.getCode());

        return new ResponseEntity<>(resBody, e.getStatus());
    }
}
