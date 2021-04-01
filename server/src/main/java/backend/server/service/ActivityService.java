package backend.server.service;

import backend.server.DTO.ActivityDTO;
import backend.server.entity.Activity;
import backend.server.entity.Member;
import backend.server.entity.Partner;
import backend.server.repository.ActivityRepository;
import backend.server.repository.PartnerRepository;
import backend.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final PartnerRepository partnerRepository;
    private final UserRepository userRepository;

    // 활동 생성 화면
    @Transactional(readOnly = true)
    public List<ActivityDTO> createActivity(String stdId) {

        List<List<Object>> partnerList = activityRepository.getPartnerList(stdId);

        if (partnerList.isEmpty()) {
            return null;
        }

        List<ActivityDTO> partners = new ArrayList<>();

        partnerList.forEach(e -> {

            ActivityDTO activityDTO = new ActivityDTO();
            activityDTO.setPartnerName(e.get(0).toString());
            activityDTO.setPartnerDetail(e.get(1).toString());

            partners.add(activityDTO);
        });

        return partners;
    }
}
