package backend.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
// 활동 후 경로 캡쳐
public class MapCapture {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapCaptureId;

    @Column(columnDefinition = "LONGTEXT")
    private String map; // 맵 좌표

    // join 할 활동 id
    private Long activityId;
}
