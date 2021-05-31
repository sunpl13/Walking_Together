package backend.server.controller;

import backend.server.DTO.ActivityDTO;
import backend.server.DTO.ActivityEndDTO;
import backend.server.DTO.TokenDTO;
import backend.server.exception.ApiException;
import backend.server.message.Message;
import backend.server.service.ActivityService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@RestController
public class ActivityController {

    private final ActivityService activityService;

    // 활동 생성 화면
    @GetMapping("/activity/create")
    public Map<String, Object> createActivity(@RequestParam(value = "stdId") String stdId) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", 200);
        response.put("message", "파트너 리스트 불러오기 완료");

        List<ActivityDTO> activity = activityService.createActivity(stdId);

        if (activity == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "파트너가 존재하지 않습니다.", 400L);
        }

        List<Map<String, Object>> partners = new ArrayList<>();
        activity.forEach(a -> {

            String years = a.getPartnerBirth().substring(2, 4);
            Map<String, Object> partner = new HashMap<>();
            partner.put("partnerName", a.getPartnerName());
            partner.put("partnerDetail", a.getPartnerDetail());
            partner.put("partnerDivision", a.getActivityDivision());
            partner.put("partnerBirth", years);
            partner.put("partnerId", a.getPartnerId());

            partners.add(partner);
        });

        response.put("partners", partners);

        return response;
    }

    // 활동 생성 완료
    @PostMapping("/activity/createActivity")
    public ResponseEntity<Message> createActivityDone(@RequestParam(value = "partnerId") Long partnerId,
            @RequestParam(value = "stdId") String stdId, @RequestParam(value = "startPhoto") MultipartFile startPhoto) {

        Long result = activityService.createActivityDone(partnerId, stdId, startPhoto);

        if (result == 404L) {
            throw new ApiException(HttpStatus.NOT_FOUND, "존재하지 않는 파트너입니다.", 404L);
        }

        if (result == 405L) {
            throw new ApiException(HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다.", 405L);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("activityId", result);

        Message resBody = new Message();
        resBody.setMessage("저장 완료");
        resBody.setData(response);

        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }

    // 활동 종료
    @PostMapping(value = "/activity/end", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> endActivity(@ModelAttribute ActivityEndDTO activityEndDTO) {

        String[] map = activityEndDTO.getMap().substring(1, activityEndDTO.getMap().length() - 1).replace("{", "")
                .replace("}", "").split(",");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime activityEndTime = LocalDateTime.parse(activityEndDTO.getEndTime(), formatter);

        Long result = activityService.endActivity(activityEndTime, activityEndDTO.getEndPhoto(),
                activityEndDTO.getActivityId(), activityEndDTO.getDistance(), map, activityEndDTO.getCheckNormalQuit());

        if (result == 404L) {
            throw new ApiException(HttpStatus.NOT_FOUND, "활동이 존재하지 않습니다.", 404L);
        }
        if (result == 405L) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "종료 사진이 전송되지 않았습니다.", 405L);
        }
        if (result == 406L) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "맵 경로 사진이 전송되지 않았습니다.", 406L);
        }
        if (result == 407L) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "이미 종료된 활동입니다.", 407L);
        }

        if (result == 500L) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "최소 활동 시간을 초과하지 못했습니다.", 500L);
        }
        if (result == 501L) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "최소 활동 거리를 초과하지 못했습니다.", 501L);
        }
        if (result == 502L) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "활동이 비정상적으로 종료되었고 시간을 충족시키지 못했습니다.", 502L);
        }
        if (result == 503L) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "활동이 비정상적으로 종료되었고 거리를 충족시키지 못했습니다.", 503L);
        }

        Message resBody = new Message();
        resBody.setMessage("저장 성공");

        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }

    // 활동 비정상 종료시 학번 리턴
    @PostMapping("/returnId")
    public String tokenToStdId(@RequestBody TokenDTO tokenDTO) {

        String stdId = activityService.tokenToStdId(tokenDTO);

        return stdId;
    }

}