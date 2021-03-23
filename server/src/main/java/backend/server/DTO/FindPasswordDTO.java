package backend.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindPasswordDTO {  // 비밀번호 찾기시 사용

    private String birth;

    private String name;

    private String stdId;

}
