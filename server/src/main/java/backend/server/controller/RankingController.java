package backend.server.controller;

import backend.server.DTO.RankingDTO;
import backend.server.service.RankingService;
import lombok.RequiredArgsConstructor;
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
    public Map<String, Object> ranking() {

        Map<String, Object> response = new HashMap<>();

        List<RankingDTO> rankers = rankingService.ranking();

        response.put("status", 200);
        response.put("message", "랭킹 불러오기 성공");
        response.put("data", rankers);

        return response;
    }
}
