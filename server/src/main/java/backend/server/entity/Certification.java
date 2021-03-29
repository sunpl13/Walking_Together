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

}
