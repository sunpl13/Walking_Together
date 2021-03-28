package backend.server.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Entity
public class Certification {

    @Id
    private Long cetificationId; // 활동 아이디와 같음

    private LocalDateTime activityDate;

    private String review;

    private String partnerName;

    private String mapPhoto;

    private String startPhoto;

    private String endPhoto;

    private String department;

    private Long stdId;

    private String memberName;

    private LocalDateTime startTime;

    private Long conversionTime;

    private Long distance;

    /*
활동일
소감문
파트너이름
지도사진
시작사진
종료사진
학과
학번
이름
시작시간
환산시간
종료시간
총이동거리

     */
}
