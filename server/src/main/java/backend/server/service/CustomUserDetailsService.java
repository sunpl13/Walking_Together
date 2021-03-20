package backend.server.service;

import backend.server.entity.Member;
import backend.server.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
        return userRepository.findOneWithAuthoritiesByStdId(username)
                .map(member -> createUser(username, member))
                .orElseThrow(() -> new UsernameNotFoundException(username + "-> 데이터베이스에서 찾을 수 없다."));
    }

    private org.springframework.security.core.userdetails.User createUser(String username, Member member) {
        // 유저가 활성화 상태라면
        if (!member.isActivate()) {
            throw new RuntimeException(username + "-> 활성화되어 있지 않습니다.");
        }
        List<GrantedAuthority> grantedAuthorities = member.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority("ROLE_USER"))
                .collect(Collectors.toList());

        // 유저 권한 정보들, Username, Password를 가지고 User 객체를 생성하여 리턴하게된다.
        return new org.springframework.security.core.userdetails.User(member.getStdId(),
                member.getPassword(), grantedAuthorities);
    }
}
