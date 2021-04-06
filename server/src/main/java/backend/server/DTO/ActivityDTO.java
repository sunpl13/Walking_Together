package backend.server.DTO;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDTO {

    private String partnerName;

    private String partnerDetail;

    private MultipartFile startPhoto;

    private Long partnerId;

    private String stdId;

    private LocalDate activityDate;

    private int activityDivision;

    private int activityStatus;
}
