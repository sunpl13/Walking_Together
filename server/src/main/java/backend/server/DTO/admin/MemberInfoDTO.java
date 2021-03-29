package backend.server.DTO.admin;

import com.querydsl.core.Tuple;
import lombok.*;

import javax.annotation.security.DenyAll;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoDTO {
    //member.name, member.stdId, member.department,
    //                member.email, member.birth, member.pNumber

    private String stdName;

    private String stdId;

    private String stdDepartment;

    private String stdEmail;

    private String stdBirth;

    private String pNumber;

}
