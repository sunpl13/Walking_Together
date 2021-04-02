package backend.server.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
// 활동 시작사진, 종료사진을 저장하는 entity
public class MapPhoto {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapPhotoId;

    @NonNull
    private String photoURL;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id")
    private Activity activity;
}
