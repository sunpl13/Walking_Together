package backend.server.service;

import backend.server.DTO.feed.FeedDTO;
import backend.server.DTO.feed.FeedDetailDTO;
import backend.server.entity.Activity;
import backend.server.repository.ActivityRepository;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class FeedService {

    private final ActivityRepository activityRepository;

    // 피드
    public List<FeedDTO> feedMain(String stdId, String sort) {

        List<Tuple> tuples = activityRepository.feed(stdId, sort);
        System.out.println(tuples);
        List<FeedDTO> result = new ArrayList<>();

        tuples.forEach( tuple -> {
            FeedDTO dto = FeedDTO.builder()
                    .activityStatus(tuple.get(0, Integer.class))
                    .distance(tuple.get(1, Long.class))
                    .partnerName(tuple.get(2, String.class))
                    .activityDate(tuple.get(3, LocalDate.class))
                    .activityDivision(tuple.get(4, Integer.class))
                    .build();
            result.add(dto);
        });

        return result;
    }

    // 피드 상세
    public FeedDetailDTO feedDetail(Long activityId) {

        Optional<Activity> activityOptional = activityRepository.findById(activityId);

        if(activityOptional.isEmpty()) {
            return null;
        }

        Tuple result = activityRepository.feedDetail(activityId);

        FeedDetailDTO dto = FeedDetailDTO.builder()
                .activityDate(result.get(0, LocalDate.class))
                .partnerName(result.get(1, String.class))
                .startTime(result.get(2, LocalDateTime.class))
                .endTime(result.get(3, LocalDateTime.class))
                .activityDivision(result.get(4, Integer.class))
                .review(result.get(5, String.class))
                .mapPicture(result.get(6, String.class))
                .build();

        return dto;
    }

    @Transactional
    public Long activityReview(Long activityId, FeedDetailDTO feedDTO) {

        Optional<Activity> activityOptional = activityRepository.findById(activityId);

        if(activityOptional.isEmpty()) {
            return 404L;
        }

        if (feedDTO.getReview() == null) {
            return 405L;
        }

        Activity activity = activityOptional.get();

        if(activity.getActivityStatus() == 1) {
            return 406L;
        }

        activity.changeReview(feedDTO.getReview());
        System.out.println(feedDTO.getReview());

        return activityId;
    }
}
