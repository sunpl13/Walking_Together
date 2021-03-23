package backend.server.controller;

import backend.server.DTO.FindPasswordDTO;
import backend.server.DTO.UserDTO;
import backend.server.entity.Member;
import backend.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import static java.lang.Math.abs;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/signup")
    public Map<String, Object> signup(@Valid @RequestBody UserDTO userDto) throws Exception {

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);

        if (userService.signup(userDto) == null) {
            response.put("status", "406");
            response.put("message", "중복된 회원입니다.");
            return response;
        }

        if (userService.signup(userDto) == "emailDup") {
            response.put("status", "407");
            response.put("message", "이미 가입된 이메일입니다.");
            return response;
        }

        userService.signup(userDto);
        response.put("status", "200");
        response.put("message", "회원가입이 성공적으로 완료되었습니다.");
        return response;
    }

    // 회원가입시 인증코드 전송
    @GetMapping("/signup/authNum") // {}로 바꾸기
    public Map<String, Object> sendAuthNum(@RequestParam(value = "email", required = false) String email) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "메일이 성공적으로 발송되었습니다.");

        String authNumber = "";

        Random random = new Random();
        Long l = abs(random.nextLong());
        authNumber += String.valueOf(l).substring(0, 7);

        try {
            userService.sendAuthNumber(email, authNumber);
        } catch (Exception e) {
            response.put("status", 400);
            response.put("message", "인증번호 전송에 실패했습니다.");
            return response;
        }
        response.put("authNum", authNumber);
        return response;
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Member> getMyUserInfo() {

        return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Member> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username).get());
    }

    // 비밀번호 찾기
    @PostMapping("/findpassword")
    public Map<String, Object> findPassword(@RequestBody FindPasswordDTO findPasswordDTO) {

        String email = userService.findPassword(findPasswordDTO.getStdId(), findPasswordDTO.getName(),
                findPasswordDTO.getBirth());

        Map<String, Object> response = new HashMap<>();
        response.put("status", "200");
        response.put("message", "임시 비밀번호가 입력하신 이메일로 발송 되었습니다.");
        response.put("email", email);

        if (email == "noMember") {

            response.put("status", "400");
            response.put("message", "일치하는 정보가 없습니다.");
            response.remove("email");
            return response;
        }

        return response;
    }

    @GetMapping("/authenticTest")
    public String authenticTest(@RequestBody String str) {

        return str;
    }
}
