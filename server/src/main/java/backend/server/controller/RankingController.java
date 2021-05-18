package backend.server.controller;

import backend.server.DTO.RankingDTO;
import backend.server.message.Message;
import backend.server.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/ranking")
    public ResponseEntity<Message> ranking() {

        Message resBody = new Message();
        List<RankingDTO> rankers = rankingService.ranking();

        resBody.setMessage("랭킹 불러오기 성공");
        resBody.setData(rankers);

        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }
}
