package backend.server.DTO;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@Data
public class MailDTO {

    private String address; // 수신자 이메일
    private String title;   // 제목
    private String message; // 내용
}
