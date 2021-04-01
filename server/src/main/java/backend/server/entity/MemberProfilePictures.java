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
public class MemberProfilePictures {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profilePictureId;

    private String profilePictureUrl;

    private String profilePictureName;

    // join 할 학번
    private String stdId;

    public void changeFileUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public void changeFileName(String profilePictureName) {
        this.profilePictureName = profilePictureName;
    }
}
