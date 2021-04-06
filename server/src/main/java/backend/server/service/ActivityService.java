package backend.server.service;

import backend.server.DTO.ActivityDTO;
import backend.server.DTO.CertificationDTO;
import backend.server.entity.Activity;
import backend.server.entity.Certification;
import backend.server.entity.Member;
import backend.server.entity.Partner;
import backend.server.repository.*;
import backend.server.s3.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.NameNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final PartnerRepository partnerRepository;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;
    private final ActivityCheckImagesRepository activityCheckImagesRepository;
    private final CertificationRepository certificationRepository;


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

    // 활동 생성 완료
    public Long createActivityDone(Long partnerId, String stdId, MultipartFile startPhoto) {

        Optional<Partner> partnerOpt = partnerRepository.findById(partnerId);
        if(partnerOpt.isEmpty()) {
            return 404L;
        }

        Optional<Member> memberOpt = userRepository.findMemberByStdId(stdId);
        if(memberOpt.isEmpty()) {
            return 405L;
        }

        Partner partner = partnerOpt.get();

        int activityDivision;
        if(partner.isPartnerDivision()) {
            activityDivision = 1;
        } else {
            activityDivision = 0;
        }

        ActivityDTO dto = ActivityDTO.builder()
                .stdId(stdId)
                .activityDivision(activityDivision)
                .partnerId(partnerId)
                .build();

        Activity activity = dtoToEntity(dto);
        Activity savedActivity = activityRepository.save(activity);

        fileUploadService.uploadMapImages(startPhoto, savedActivity.getActivityId(),"start");

        return savedActivity.getActivityId();
    }

    private Activity dtoToEntity(ActivityDTO dto) {
        Optional<Partner> partnerOptional = partnerRepository.findById(dto.getPartnerId());

        Optional<Member> memberOptional = userRepository.findMemberByStdId(dto.getStdId());

        Partner partner = partnerOptional.get();

        Member member = memberOptional.get();

        return Activity.builder()
                .partner(partner)
                .member(member)
                .activityDate(LocalDate.now())
                .activityDivision(dto.getActivityDivision())
                .activityStatus(1)
                .startTime(LocalDateTime.now())
                .build();
    }

    // 활동 종료
    public Long endActivity(LocalDateTime endTime, MultipartFile endPhoto, Long activityId, Long distance) {

        Optional<Activity> activityOptional = activityRepository.findById(activityId);

        if(activityOptional.isEmpty()) {
            return 404L;
        }

        Activity activity = activityOptional.get();

        Member member = activity.getMember();
        totalDistanceCalculator(member.getStdId(), distance);   // 활동 거리 계산

        activity.changeDistance(distance);
        activity.changeEndTime(endTime);
        activity.changeActivityStatus(0);

        fileUploadService.uploadMapImages(endPhoto, activityId, "end");

        return activityId;
    }

    // 활동 거리 계산
    public void totalDistanceCalculator(String stdId, Long distance) {

        Member member = userRepository.findMemberByStdId(stdId).get();

        Long totalDistance = member.getDistance() + distance;

        member.changeDistance(totalDistance);
    }
}
