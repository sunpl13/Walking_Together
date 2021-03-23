package backend.server.DTO;

import com.sun.istack.NotNull;
import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
// 회원가입시 사용
public class UserDTO {

    @NotNull
    @Size(min = 3, max = 50)
    private String stdId;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String birth;

    @NotNull
    private String department;

    @NotNull
    private String pNumber;

}
