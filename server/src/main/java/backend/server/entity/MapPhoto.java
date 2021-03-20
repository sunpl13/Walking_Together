package backend.server.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class MapPhoto {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapPhotoId;

    @NonNull
    private String photoURL;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id")
    private Activity activity;
}
