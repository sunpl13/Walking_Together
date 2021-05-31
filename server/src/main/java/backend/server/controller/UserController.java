package backend.server.controller;

import backend.server.DTO.FindPasswordDTO;
import backend.server.DTO.UserDTO;
import backend.server.entity.Member;
import backend.server.exception.ApiException;
import backend.server.message.Message;
import backend.server.message.StatusEnum;
import backend.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

//     회원가입
    @PostMapping("/signup")
    public ResponseEntity<Message> signup(@Valid @RequestBody UserDTO userDto) throws Exception {

        Message resBody = new Message();

        if (userService.signup(userDto) == null) {
            throw new ApiException(HttpStatus.CONFLICT, "중복된 회원입니다.", 409L);
        }

        if (userService.signup(userDto) == "emailDup") {
            throw new ApiException(HttpStatus.CONFLICT, "중복된 이메일입니다.", 409L);
        }

        if (userService.signup(userDto) == "phoneNumberDup") {
            throw new ApiException(HttpStatus.CONFLICT, "중복된 휴대폰번호 입니다.", 409L);
        }

        userService.signup(userDto);
        resBody.setMessage("회원가입이 성공적으로 완료되었습니다.");

        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }

    // 회원가입시 인증코드 전송
    @GetMapping("/signup/authNum") // {}로 바꾸기
    public ResponseEntity<Message> sendAuthNum(@RequestParam(value = "email", required = false) String email) {

        Map<String ,Object> response = new HashMap<>();

        Message resBody = new Message();
        resBody.setMessage("메일이 성공적으로 발송되었습니다.");

        String authNumber = "";

        Random random = new Random();
        Long l = abs(random.nextLong());
        authNumber += String.valueOf(l).substring(0, 7);

        String result = userService.sendAuthNumber(email, authNumber);
        if (result.equals("409")) {
            throw new ApiException(HttpStatus.CONFLICT, "이미 가입된 메일입니다.", 409L);

        }
            response.put("authNum", authNumber);
        resBody.setData(response);
            return new ResponseEntity<>(resBody, null, HttpStatus.OK);
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
    public ResponseEntity<Message> findPassword(@RequestBody FindPasswordDTO findPasswordDTO) {

        String email = userService.findPassword(findPasswordDTO.getStdId(), findPasswordDTO.getName(),
                findPasswordDTO.getBirth());

        Map<String, Object> response = new HashMap<>();
        response.put("email", email);

        Message resBody = new Message();
        resBody.setMessage("임시 비밀번호가 입력하신 이메일로 발송 되었습니다.");
        resBody.setData(response);

        if (email == "noMember") {

            throw new ApiException(HttpStatus.NOT_FOUND,"일치하는 정보가 없습니다." ,400L);
        }

        return new ResponseEntity<>(resBody,null, HttpStatus.OK);
    }

    @GetMapping("/authenticTest")
    public String authenticTest(@RequestBody String str) {

        return str;
    }
}
