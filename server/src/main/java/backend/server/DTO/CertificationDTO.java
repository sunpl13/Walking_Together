package backend.server.DTO;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CertificationDTO {

    private Long certificationId;

    private LocalDate activityDate;

    private String careTime;

    private String ordinaryTime;

    private String department;

    private Long distance;

    private String stdId;

    private String name;

    private Long totalTime;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String partnerName;
}
