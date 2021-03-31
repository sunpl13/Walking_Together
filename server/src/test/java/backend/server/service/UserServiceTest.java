package backend.server.service;

import backend.server.entity.Member;
import backend.server.entity.MemberRole;
import backend.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    public void insertAdmin() {

        Member admin = Member.builder()
                .stdId("0000000000")
                .password(passwordEncoder.encode("1234"))
                .activate(true)
                .department("관리자")
                .birth("19950311")
                .name("관리자")
                .email("rhdtn311@gmail.com")
                .pNumber("01010102020")
                .build();
        admin.addMemberRole(MemberRole.ADMIN);

        userRepository.save(admin);
    }

}