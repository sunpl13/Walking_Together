package backend.server.DTO;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CertificationDTO {

    private Long certificationId;

    private LocalDate activityDate;

    private LocalTime careTime;

    private LocalTime ordinaryTime;

    private String department;

    private Long distance;

    private String stdId;

    private String name;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String partnerName;
}
