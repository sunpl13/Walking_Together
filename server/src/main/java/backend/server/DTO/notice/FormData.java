package backend.server.DTO.notice;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FormData {

    private List<MultipartFile> imageFiles;

    private List<MultipartFile> attachedFiles;

    private String title;

    private String content;

}
