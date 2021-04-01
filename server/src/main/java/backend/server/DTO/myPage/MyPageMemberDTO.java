package backend.server.DTO.myPage;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyPageMemberDTO {

    private String name;

    private String department;

    private String password;

    private Long totalTime;

    private String profilePicture;
}
