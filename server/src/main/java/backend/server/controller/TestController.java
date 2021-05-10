package backend.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return "CORS TEST";
    }

}
