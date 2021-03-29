package backend.server.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@ToString(exclude = "member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Activity extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;    // 활동번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "std_id")
    private Member member;  // member

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "activity")
    private Map map;    // map

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_id")
    private Partner partner;

    @OneToMany(mappedBy = "activity")
    private List<MapPhoto> mapPhoto;

    private String review;  // 소감문

    private String startImage;  // 시작 사진

    private String endImage;    // 종료 사진

    private LocalDate activityDate; // 활동 날짜

    private boolean activityStatus; // 활동 상태

    private LocalDateTime startTime;    // 시작 시간

    private LocalDateTime endTime;   // 종료 시간

    private boolean activityDivision;   // 활동 구분 (돌봄, 일반)

    private Long distance;  // 총 이동거리

    private Long certificationId;

}
