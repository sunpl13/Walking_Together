package backend.server.security.config;

import backend.server.security.jwt.JwtAccessDeniedHandler;
import backend.server.security.jwt.JwtAuthenticationEntryPoint;
import backend.server.security.jwt.JwtSecurityConfig;
import backend.server.security.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // @PreAuthorize 어노테이션을 메소드 단위로 추기하기 위해 적용
// jwt 폴더에 만든 5개의 클래스를 추가
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // 토큰 생성 및 유효성 검증
    private final TokenProvider tokenProvider;
    // 401 에러 처리
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    // 403 에러 처리
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/favicon.ico");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // 토큰을 사용하기 때문에 csrf는 disable
                .csrf().disable()
                // Exception 을 핸들링 할 때 우리가 만든 클래스로 추가
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and().headers().frameOptions().sameOrigin()

                // 세션 사용 x
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)


                .and()
                .authorizeRequests()    // HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정
                .antMatchers("/noticeList").permitAll()
                .antMatchers("/*").permitAll()
                .antMatchers("/notice").permitAll()
                .antMatchers("/admin/*").permitAll()
                .antMatchers("/hello").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/findpassword").permitAll()
                .antMatchers("/signup/authNum").permitAll()
                .antMatchers("/auth").permitAll()
                .anyRequest().authenticated() // 나머지 요청은 모두 인증을 요구한다.

                // JwtSecurityConfig 클래스 적용
                .and().apply(new JwtSecurityConfig(tokenProvider));

    }
}
