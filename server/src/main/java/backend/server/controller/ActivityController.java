package backend.server.controller;

import backend.server.DTO.ActivityDTO;
import backend.server.entity.Activity;
import backend.server.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class ActivityController {

    private final ActivityService activityService;

    // 활동 생성 화면면
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

       List<Map<String,Object>> partners = new ArrayList<>();
        activity.forEach(a -> {
            Map<String, Object> partner = new HashMap<>();
            partner.put("partnerName", a.getPartnerName());
            partner.put("partnerDetail", a.getPartnerDetail());

            partners.add(partner);
        });

       response.put("partners", partners);

       return response;
    }
}
