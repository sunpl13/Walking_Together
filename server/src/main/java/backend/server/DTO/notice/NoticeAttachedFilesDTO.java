package backend.server.DTO.notice;

import backend.server.entity.NoticeAttachedFiles;
import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeAttachedFilesDTO {

    private List<NoticeAttachedFiles> noticeFiles;
}
