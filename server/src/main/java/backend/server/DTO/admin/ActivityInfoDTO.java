package backend.server.DTO.admin;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityInfoDTO {

    //member.name, member.department, member.stdId, activity.activityDate,
    // activity.startTime, activity.activityId, activity.endTime, member.distance, partner.partnerName

    private String stdName;

    private String department;

    private String stdId;

    private LocalDate activityDate;

    private LocalDateTime activityStartTime;

    private LocalDateTime endTime;

    private Long activityId;

    private Long distance;

    private String partnerName;


}
