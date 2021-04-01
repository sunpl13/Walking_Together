package backend.server.DTO.myPage;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberProfilePicturesDTO {

    private MultipartFile memberProfilePictures;
}
