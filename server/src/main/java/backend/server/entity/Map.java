package backend.server.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class Map {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapId; // 맵id

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id")
    private Activity activity;  // 활동

    private LocalDateTime time; // 걸리는 시간

    private Long distance;  // 거리


}
