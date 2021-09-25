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
public class PartnerPhotos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partnerPhotoId;

    private String partnerPhotoUrl;

    private String partnerPhotoName;

    // join 할 파트너Id
    private Long partnerId;

    public void changeFileUrl(String partnerPhotoUrl) {
        this.partnerPhotoUrl = partnerPhotoUrl;
    }

    public void changeFileName(String partnerPhotoName) {
        this.partnerPhotoName = partnerPhotoName;
    }
}
