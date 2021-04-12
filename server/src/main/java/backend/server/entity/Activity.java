package backend.server.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@ToString(exclude = "member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Activity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId; // 활동번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "std_id")
    private Member member; // member

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "activity")
    private Map map; // map

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_id")
    private Partner partner;

    private String review; // 소감문

    private LocalDate activityDate; // 활동 날짜

    private int activityStatus; // 활동 상태

    private LocalDateTime startTime; // 시작 시간

    private LocalDateTime endTime; // 종료 시간

    private LocalTime careTime; // 돌봄 활동 환산 시간

    private LocalTime ordinaryTime; // 일반 활동 환산 시간

    private int activityDivision; // 활동 구분 (돌봄, 일반)

    private Long distance; // 총 이동거리

    // 종료 시간 입력
    public void changeEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    // 거리 입력
    public void changeDistance(Long distance) {
        this.distance = distance;
    }

    // 활동 종료로 변경
    public void changeActivityStatus(int activityStatus) {
        this.activityStatus = activityStatus;
    }

    // 소감문 등록
    public void changeReview(String review) {
        this.review = review;
    }

    // 돌봄 환산 시간
    public void changeCareTime(LocalTime careTime) {
        this.careTime = careTime;
    }

    // 일반 환산 시간
    public void changeOrdinaryTime(LocalTime ordinaryTime) {
        this.ordinaryTime = ordinaryTime;
    }

}
