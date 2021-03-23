package backend.server.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Member extends BaseEntity {

    @Id
    @Column(unique = true, nullable = false)
    private String stdId;   // 학번

    @Column(nullable = false)
    private String name;    // 이름

    @Column(unique = true, nullable = false)
    private String email;   // 이메일

    @Column( nullable = false)
    private String password;    // 비밀번호

    private String birth;   // 생년월일

    private String department;  // 학과

    private String pNumber; // 연락처

    private Long distance;    // 총거리

    // 프로필 사진이 들어와야함.
    private boolean activate;   // 활동 상태

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private List<Activity> activities = new ArrayList<>();  // 활동id

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.ALL)
    private List<Partner> partners = new ArrayList<>(); // 파트너 id

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> authorities = new HashSet<>();  // 권한

    public void addMemberRole(MemberRole memberRole) {
        authorities.add(memberRole);
    }

    // 비밀번호 변경
    public void changePassword(String password) {
        this.password = password;
    }

}
