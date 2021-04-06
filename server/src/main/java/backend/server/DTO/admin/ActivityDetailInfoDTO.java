package backend.server.DTO.admin;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityDetailInfoDTO {

    private String stdName;

    private String department;

    private String stdId;

    private LocalDate activityDate;

    private String partnerName;

    private String review;

    private String mapPicture;

    private Long totalDistance;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
}
