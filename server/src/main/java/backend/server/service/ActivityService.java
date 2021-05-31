package backend.server.service;

import backend.server.DTO.ActivityDTO;
import backend.server.DTO.TokenDTO;
import backend.server.entity.*;
import backend.server.exception.ApiException;
import backend.server.repository.*;
import backend.server.s3.FileUploadService;
import backend.server.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.List;

import static java.time.temporal.ChronoUnit.HOURS;

@RequiredArgsConstructor
@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final PartnerRepository partnerRepository;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;
    private final ActivityCheckImagesRepository activityCheckImagesRepository;
    private final CertificationRepository certificationRepository;
    private final MapCaptureRepository mapCaptureRepository;

    private final TokenProvider tokenProvider;

    // 활동 생성 화면
    @Transactional(readOnly = true)
    public List<ActivityDTO> createActivity(String stdId) {

        boolean doingActivity = activityRepository.findDoingActivity(stdId);
        if (doingActivity) {
            throw new ApiException(HttpStatus.CONFLICT, "이미 진행 중인 활동이 있습니다.", 400L);
        }

        List<List<Object>> partnerList = activityRepository.getPartnerList(stdId);

        if (partnerList.isEmpty()) {
            return null;
        }

        List<ActivityDTO> partners = new ArrayList<>();

        partnerList.forEach(e -> {

            ActivityDTO activityDTO = new ActivityDTO();
            activityDTO.setPartnerName(e.get(0).toString());
            activityDTO.setPartnerDetail(e.get(1).toString());
            activityDTO.setPartnerBirth(e.get(2).toString());
            activityDTO.setPartnerId((Long) e.get(3));

            partners.add(activityDTO);
        });

        return partners;
    }

    // 활동 생성 완료
    @Transactional
    public Long createActivityDone(Long partnerId, String stdId, MultipartFile startPhoto) {

        Optional<Partner> partnerOpt = partnerRepository.findById(partnerId);
        if (partnerOpt.isEmpty()) {
            return 404L;
        }

        Optional<Member> memberOpt = userRepository.findMemberByStdId(stdId);
        if (memberOpt.isEmpty()) {
            return 405L;
        }

        Partner partner = partnerOpt.get();

        int activityDivision;
        if (partner.getPartnerDivision() == 1) {
            activityDivision = 1;
        } else {
            activityDivision = 0;
        }

        ActivityDTO dto = ActivityDTO.builder().stdId(stdId).activityDivision(activityDivision).partnerId(partnerId)
                .build();

        Activity activity = dtoToEntity(dto);
        Activity savedActivity = activityRepository.save(activity);

        fileUploadService.uploadMapImages(startPhoto, savedActivity.getActivityId(), "start");

        return savedActivity.getActivityId();
    }

    private Activity dtoToEntity(ActivityDTO dto) {
        Optional<Partner> partnerOptional = partnerRepository.findById(dto.getPartnerId());

        Optional<Member> memberOptional = userRepository.findMemberByStdId(dto.getStdId());

        Partner partner = partnerOptional.get();

        Member member = memberOptional.get();

        return Activity.builder().partner(partner).member(member).activityDate(LocalDate.now())
                .activityDivision(dto.getActivityDivision()).activityStatus(1).startTime(LocalDateTime.now()).build();
    }

    // 활동 종료
    @Transactional
    public Long endActivity(LocalDateTime endTime, MultipartFile endPhoto, Long activityId, Long distance, String[] map,
                            int checkNormalQuit) {

        Optional<Activity> activityOptional = activityRepository.findById(activityId);

        if (activityOptional.isEmpty()) {
            return 404L;
        }

        Activity activity = activityOptional.get();
        if (activity.getEndTime() != null) {
            return 407L;
        }

        long minutes = ChronoUnit.MINUTES.between(activity.getStartTime(), endTime);
        if (minutes < 30 && checkNormalQuit == 0) {
            return 500L;
        } else if (minutes < 30 && checkNormalQuit == 1) {
            activity.changeActivityStatus(0);
            activity.changeEndTime(endTime);
            activity.changeOrdinaryTime(LocalTime.of(0, 0));
            activity.changeCareTime(LocalTime.of(0, 0));
            activity.changeDistance(0L);
            return 502L;
        }

        if (activity.getActivityDivision() == 0) {
            if (distance < 4000 && checkNormalQuit == 0) {
                return 501L;
            } else if (distance < 4000 && checkNormalQuit == 1) {
                activity.changeActivityStatus(0);
                activity.changeEndTime(endTime);
                activity.changeOrdinaryTime(LocalTime.of(0, 0));
                activity.changeDistance(0L);
                return 503L;
            }
        } else if (activity.getActivityDivision() == 1) {
            if (distance < 2000 && checkNormalQuit == 0) {
                return 501L;
            } else if (distance < 2000 && checkNormalQuit == 1) {
                activity.changeActivityStatus(0);
                activity.changeEndTime(endTime);
                activity.changeCareTime(LocalTime.of(0, 0));
                activity.changeDistance(0L);
                return 503L;
            }
        }

        if (endPhoto != null && checkNormalQuit == 0) {
            fileUploadService.uploadMapImages(endPhoto, activityId, "end");
        } else if (checkNormalQuit == 0) {
            return 405L;
        }

        // ["lat":37.5477517, "lon":127.02928809999999, "timestamp":1622384391414,
        // "lat":37.5477517, "lon":127.02928809999999, "timestamp":1622387421459]
        if (map != null) {

            HashMap<String, String> latLonTime = new HashMap<>();

            int count = 0;
            for (String data : map) {

                System.out.println("array : " + Arrays.toString(map));

                String[] splitResult = data.split(":");
                System.out.println("splitResult : " + Arrays.toString(splitResult));
                latLonTime.put(splitResult[0].trim(), splitResult[1].trim());

                count++;
                if (count == 3) {
                    MapCapture mapCapture = MapCapture.builder().activityId(activityId).lat(latLonTime.get("\"lat\""))
                            .lon(latLonTime.get("\"lon\"")).timestamp(latLonTime.get("\"timestamp\"")).build();

                    mapCaptureRepository.save(mapCapture);
                    count = 0;
                }
            }
        }
        Member member = activity.getMember();

        totalDistanceCalculator(member.getStdId(), distance); // 활동 거리 계산

        activity.changeDistance(distance);
        activity.changeEndTime(endTime);
        activity.changeActivityStatus(0);

        totalTimeCalculator(member.getStdId(), activity); // 활동 시간 계산

        changeTotalTime(activity); // 회원의 총 환산 시간 변경

        Long result = saveCertification(member.getStdId(), activityId, distance);

        if (result == 500L) {
            return 500L;
        }
        if (result == 501L) {
            return 501L;
        }

        return activityId;
    }

    // 총 환산 시간 계산
    public Long totalTimeCalculator(String stdId, Activity activity) {

        long minutes = ChronoUnit.MINUTES.between(activity.getStartTime(), activity.getEndTime());

        int totalHours = 0;
        int totalMinutes = 0;

        if (activity.getActivityDivision() == 1) { // 돌봄

            totalHours = (int) ChronoUnit.HOURS.between(activity.getStartTime(), activity.getEndTime());
            totalMinutes = ((int) minutes - (60 * totalHours) < 30) ? 0 : 30;
        } else if (activity.getActivityDivision() == 0) { // 일반

            totalHours = (int) ChronoUnit.HOURS.between(activity.getStartTime(), activity.getEndTime());
            totalMinutes = ((int) minutes - (60 * totalHours) < 30) ? 0 : 30;
        }

        LocalTime totalTime = LocalTime.of((int) totalHours, (int) totalMinutes);
        if (activity.getActivityDivision() == 0) {
            activity.changeOrdinaryTime(totalTime);
        } else {
            activity.changeCareTime(totalTime);
        }

        return activity.getActivityId();
    }

    // 활동 거리 계산
    public void totalDistanceCalculator(String stdId, Long distance) {

        Member member = userRepository.findMemberByStdId(stdId).get();

        Long totalDistance = member.getDistance() + distance;

        member.changeDistance(totalDistance);
    }

    // 회원의 총 환산 거리 변경
    public void changeTotalTime(Activity activity) {

        Member member = activity.getMember();

        if (activity.getActivityDivision() == 0) {
            int hours = activity.getOrdinaryTime().getHour();
            int minutes = activity.getOrdinaryTime().getMinute();
            int totalActivityTime = hours * 60 + minutes;

            int memberHours = member.getTotalTime().getHour();
            int memberMinutes = member.getTotalTime().getMinute();
            int totalMemberTime = memberHours * 60 + memberMinutes;

            int changeTime = totalActivityTime + totalMemberTime;

            LocalTime totalTime = LocalTime.of(changeTime / 60, changeTime % 60);
            member.changeTotalTime(totalTime);

        } else if (activity.getActivityDivision() == 1) {

            int hours = activity.getCareTime().getHour();
            int minutes = activity.getCareTime().getMinute();
            int totalActivityTime = hours * 60 + minutes;

            int memberHours = member.getTotalTime().getHour();
            int memberMinutes = member.getTotalTime().getMinute();
            int totalMemberTime = memberHours * 60 + memberMinutes;

            int changeTime = totalActivityTime + totalMemberTime;

            LocalTime totalTime = LocalTime.of(changeTime / 60, changeTime % 60);
            member.changeTotalTime(totalTime);

        }
    }

    // 인증서 생성
    @Transactional
    public Long saveCertification(String stdId, Long activityId, Long distance) {

        Optional<Member> memberOptional = userRepository.findMemberByStdId(stdId);
        Member member = memberOptional.get();

        Optional<Activity> activityOptional = activityRepository.findById(activityId);
        Activity activity = activityOptional.get();

        Partner partner = activity.getPartner();

        Certification certification = Certification.builder().certificationId(activityId).activityId(activityId)
                .partnerName(partner.getPartnerName()).stdId(member.getStdId()).activityDate(activity.getActivityDate())
                .department(member.getDepartment()).distance(activity.getDistance()).startTime(activity.getStartTime())
                .endTime(activity.getEndTime()).name(member.getName())
                .careTime(activity.getActivityDivision() == 1 ? activity.getCareTime() : LocalTime.of(0, 0))
                .ordinaryTime(activity.getActivityDivision() == 0 ? activity.getOrdinaryTime() : LocalTime.of(0, 0))
                .build();

        certificationRepository.save(certification);

        return distance;
    }

    public String tokenToStdId(TokenDTO tokenDTO) {

        Authentication authentication = tokenProvider.getAuthentication(tokenDTO.getToken());

        return authentication.getName();
    }
}