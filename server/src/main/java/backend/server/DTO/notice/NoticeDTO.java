package backend.server.DTO.notice;

import backend.server.entity.Notice;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeDTO {

    private String title;

    private String content;

    private LocalDateTime createTime;

    private Long noticeId;


    public Notice dtoToEntity() {
        Notice notice = Notice.builder()
                .title(title)
                .content(content)
                .build();
        return notice;
    }
}
