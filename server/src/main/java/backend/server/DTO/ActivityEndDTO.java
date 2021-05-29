package backend.server.DTO;

import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityEndDTO {

    @Nullable
    private ArrayList<String> map;

    @Nullable
    private MultipartFile endPhoto;

    private String endTime;

    private Long activityId;

    private Long distance;

    private int checkNormalQuit;

}
