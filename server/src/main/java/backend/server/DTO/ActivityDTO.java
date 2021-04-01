package backend.server.DTO;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

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
}
