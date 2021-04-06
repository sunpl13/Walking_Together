package backend.server.DTO.feed;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedDTO {

    private int activityStatus;

    private Long distance;

    private String partnerName;

    private LocalDate activityDate;

    private int activityDivision;
}

