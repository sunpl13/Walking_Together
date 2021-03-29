package backend.server.repository;

import backend.server.entity.Member;
import backend.server.entity.MemberRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.stream.LongStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void insertDummies() {
        LongStream.rangeClosed(1, 100).forEach(i -> {

            Member member = Member.builder().stdId(Long.toString(i)).activate(true).birth("960311")
                    .department("department<i>").name("name" + i).password(passwordEncoder.encode(Long.toString(i)))
                    .distance(i).pNumber("010" + i).email("member" + i + "@naver.com").build();

            member.addMemberRole(MemberRole.USER);
            userRepository.save(member);
        });
    }

    @Test
    public void insertAdmin() {
        Member admin = Member.builder().stdId("0000000000").name("관리자").password(passwordEncoder.encode("1234"))
                .email("sunpl12@naver.com").build();

        admin.addMemberRole(MemberRole.ADMIN);
        userRepository.save(admin);
    }

}