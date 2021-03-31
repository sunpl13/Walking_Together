package backend.server.service;

import backend.server.DTO.admin.ActivityInfoDTO;
import backend.server.DTO.admin.MemberInfoDTO;
import backend.server.DTO.admin.PartnerInfoDTO;
import backend.server.entity.Activity;
import backend.server.repository.ActivityRepository;
import backend.server.repository.PartnerRepository;
import backend.server.repository.UserRepository;
import backend.server.repository.admin.PartnerSearchRepository;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
// 관리자 페이지
public class AdminService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final PartnerRepository partnerRepository;

    // 학생정보조회
    public List<MemberInfoDTO> userInfo(String keyword) {

        List<Tuple> tuples = userRepository.memberDetail(keyword);
        List<MemberInfoDTO> stdList = new ArrayList<>();

        tuples.forEach(i -> {
            MemberInfoDTO dto = MemberInfoDTO.builder()
                    .stdName(i.get(0, String.class))
                    .stdId(i.get(1, String.class))
                    .stdDepartment(i.get(2, String.class))
                    .stdEmail(i.get(3, String.class))
                    .stdBirth(i.get(4, String.class))
                    .pNumber(i.get(5, String.class))
                    .build();
            stdList.add(dto);
        });

        return stdList;
    }

    // 활동정보조회
    public List<ActivityInfoDTO> activityInfo(String keyword,
                                              LocalDate from,
                                              LocalDate to,
                                              boolean activityDivision) {
        List<Tuple> tuples = activityRepository.activityInfo(keyword, from, to, activityDivision);
        List<ActivityInfoDTO> activityList = new ArrayList<>();

        tuples.forEach(activity -> {
            ActivityInfoDTO dto = ActivityInfoDTO.builder()
                    .stdName(activity.get(0, String.class))
                    .department(activity.get(1, String.class))
                    .stdId(activity.get(2, String.class))
                    .activityDate(activity.get(3, LocalDate.class))
                    .activityStartTime(activity.get(4, LocalDateTime.class))
                    .activityId(activity.get(5, Long.class))
                    .endTime(activity.get(6, LocalDateTime.class))
                    .distance(activity.get(7, Long.class))
                    .partnerName(activity.get(8, String.class))
                    .build();

            activityList.add(dto);
        });

        return activityList;
    }

    // 파트너 정보 조회
    public List<PartnerInfoDTO> partnerInfo(String keyword, String partnerDetail) {

        List<Tuple> tuples = partnerRepository.partnerInfo(keyword, partnerDetail);
        List<PartnerInfoDTO> partnerList = new ArrayList<>();

        tuples.forEach(partner -> {
            //member.name, member.stdId, member.department, partner.partnerName,
            //                partner.gender, partner.partnerBirth, partner.relationship, partner.partnerDivision

            PartnerInfoDTO dto = PartnerInfoDTO.builder()
                    .stdName(partner.get(0,String.class))
                    .stdId(partner.get(1,String.class))
                    .department(partner.get(2,String.class))
                    .partnerName(partner.get(3,String.class))
                    .partnerGender(partner.get(4,String.class))
                    .relationship(partner.get(5,String.class))
                    .partnerDivision(partner.get(6,String.class))
                    .build();

            partnerList.add(dto);
        });

        return partnerList;
    }
}
