package backend.server.controller;

import backend.server.DTO.ActivityDTO;
import backend.server.entity.Activity;
import backend.server.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            response.put("status", 400);
            response.put("message", "파트너가 존재하지 않습니다.");

            return response;
        }

        List<Map<String, Object>> partners = new ArrayList<>();
        activity.forEach(a -> {
            int partnerDivision;
            if(a.getPartnerDetail().equals("ordinary")) {
                partnerDivision = 0;
            } else {
                partnerDivision = 1;
            }

            String years = a.getPartnerBirth().substring(2,4);
            Map<String, Object> partner = new HashMap<>();
            partner.put("partnerName", a.getPartnerName());
            partner.put("partnerDetail", a.getPartnerDetail());
            partner.put("partnerDivision", partnerDivision);
            partner.put("partnerBirth", years);
            partner.put("partnerId", a.getPartnerId());

            partners.add(partner);
        });

        response.put("partners", partners);

        return response;
    }

    // 활동 생성 완료
    @PostMapping("/activity/createActivity")
    public Map<String, Object> createActivityDone(@RequestParam(value = "partnerId") Long partnerId,
                                                  @RequestParam(value = "stdId") String stdId,
                                                  @RequestParam(value = "startPhoto") MultipartFile startPhoto) {
        Map<String, Object> response = new HashMap<>();

        response.put("status", 200);
        response.put("message", "저장완료");

        Long result = activityService.createActivityDone(partnerId, stdId, startPhoto);

        if (result == 404L) {
            response.put("status", 404);
            response.put("message", "존재하지 않는 파트너입니다.");
            return response;
        }

        if (result == 405L) {
            response.put("status", 405L);
            response.put("message", "존재하지 않는 사용자입니다.");
            return response;
        }

        response.put("activityId", result);

        return response;
    }

    // 활동 종료
    @PostMapping("/activity/end")
    public Map<String, Object> endActivity(@RequestParam(value = "endTime") String endTime,
                                           @RequestParam(value = "map") MultipartFile map,
                                           @RequestParam(value = "endPhoto") MultipartFile endPhoto,
                                           @RequestParam(value = "activityId") Long activityId,
                                           @RequestParam(value = "distance") Long distance) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime activityEndTime = LocalDateTime.parse(endTime, formatter);

        Long result = activityService.endActivity(activityEndTime, endPhoto, activityId, distance, map);

        Map<String, Object> response = new HashMap<>();

        response.put("status", 200);
        response.put("message", "저장 성공");

        if (result == 404L) {
            response.put("status", 404);
            response.put("message", "활동이 존재하지 않습니다.");
            return response;
        }
        if (result == 405L) {
            response.put("status", 405);
            response.put("message", "종료 사진이 전송되지 않았습니다.");
            return response;
        }
        if (result == 406L) {
            response.put("status", 405);
            response.put("message", "맵 경로 사진이 전송되지 않았습니다.");
            return response;
        }
        if (result == 407L) {
            response.put("status", 407);
            response.put("message", "이미 종료된 활동입니다.");
            return response;
        }

        if(result == 500L) {
            response.put("status", 500);
            response.put("message", "최소 활동 시간을 초과하지 못했습니다.");
            return response;
        }
        if(result == 501L) {
            response.put("status", 501);
            response.put("message", "최소 활동 거리를 초과하지 못했습니다.");
            return response;
        }

        return response;
    }
}
