package backend.server.repository;

import backend.server.DTO.ActivityDTO;
import backend.server.entity.Activity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ActivityRepositoryTest {

    @Autowired
    private ActivityRepository activityRepository;

    @Test
    public void 활동생성화면() {

        List<List<Object>> partnerList = activityRepository.getPartnerList("2015100292");
        List<ActivityDTO> partners = new ArrayList<>();
        partnerList.forEach(e -> {

            ActivityDTO activityDTO = new ActivityDTO();
            activityDTO.setPartnerName(e.get(0).toString());
            activityDTO.setPartnerDetail(e.get(1).toString());

            partners.add(activityDTO);
        });
        System.out.println("---------------------------");
        System.out.println(partners);
        System.out.println(partnerList.get(0));
        System.out.println(partners.get(1));
    }

}