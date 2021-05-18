package backend.server.controller;

import backend.server.exception.ApiException;
import backend.server.message.Message;
import backend.server.message.StatusEnum;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Walking Together";
    }

    @GetMapping("/travisTest")
    public String travis() {
        return "Travis";
    }

    @GetMapping("/webconfigTest")
    public String webConfigTest() {
        return "CORS TEST 0513 5시 58분";
    }

    @GetMapping("/returnTest")
    public ResponseEntity<Message> returnTest() {

        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Map<String, Object> response = new HashMap<>();
        response.put("name", "태현이");
        response.put("age", 21);
        response.put("height", 180);

        message.setData(response);
        message.setMessage("아이디를 찾을 수 없습니다.");
        return new ResponseEntity<>(message, headers, HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/error")
    public String errorTest(@RequestParam(value = "id") Long id ) throws Exception {

        if (id == 1) {
            return "correct";
        } else {
            throw new ApiException(HttpStatus.CONFLICT, "아이디 중복", 403L);
        }

}}
