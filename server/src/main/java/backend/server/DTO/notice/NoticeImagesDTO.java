package backend.server.DTO.notice;

import backend.server.entity.NoticeImages;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeImagesDTO {

    private List<NoticeImages> noticeImages;

}
