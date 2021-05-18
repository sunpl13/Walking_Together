package backend.server.message;

import lombok.Data;

@Data
public class Message {

    private Long status;
    private String message;
    private Object data;

    public Message() {
        this.status = 200L;
        this.data = null;
        this.message = null;
    }
}
