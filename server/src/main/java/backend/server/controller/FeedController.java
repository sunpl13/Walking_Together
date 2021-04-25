package backend.server.controller;

import backend.server.DTO.feed.FeedDTO;
import backend.server.DTO.feed.FeedDetailDTO;
import backend.server.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/feed")
    public Map<String, Object> feedMain(@RequestParam(value = "stdId") String stdId,
                                        @RequestParam(value = "sort") String sort) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "조회 완료");

        List<FeedDTO> feedDTO = feedService.feedMain(stdId, sort);

        response.put("data",feedDTO);

        return response;
    }

    // 피드 상세
    @GetMapping("/feed/detail")
    public Map<String, Object> feedDetail(@RequestParam("activityId") Long activityId) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "조회 완료");

        FeedDetailDTO data = feedService.feedDetail(activityId);
        if(data == null) {
            response.put("status", 404);
            response.put("message", "존재하지 않는 활동입니다.");
            return response;
        }
        response.put("data", data);

        return response;
    }

    @PostMapping("/feed/detail/review")
    public Map<String, Object> feedReview(@RequestParam(value = "activityId") Long activityId,
                                          @RequestParam(value = "review") @Nullable String review) {

        Map<String, Object> response = new HashMap<>();

        FeedDetailDTO dto = FeedDetailDTO.builder()
                .review(review).build();

        Long result = feedService.activityReview(activityId, dto);

        if(result == 404L) {
            response.put("status", 400);
            response.put("message", "존재하지 않는 활동입니다.");
            return response;
        }

        if(result ==405L) {
            response.put("status", 405);
            response.put("message", "소감문을 작성해주세요.");
            return response;
        }

        if(result ==406L) {
            response.put("status", 406);
            response.put("message", "진행 중인 활동은 소감문 작성이 불가능합니다.");
            return response;
        }

        response.put("status", 200);
        response.put("message", "소감문 저장 완료");

        return response;
    }

    @PostMapping("/feed/certification")
    public Map<String, Object> createCertification(String stdId, String from, String to) {

        Map<String, Object> certification = feedService.getCertification(from, to, stdId);

        return certification;
    }
}
