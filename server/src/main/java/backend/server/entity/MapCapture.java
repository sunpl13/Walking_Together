package backend.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
// 활동 후 경로 캡쳐
public class MapCapture {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapCaptureId;

    private String mapCaptureUrl;

    private String mapCaptureName;

    // join 할 활동 id
    private Long activityId;
}
