package backend.server.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = "member")
@Entity
public class Partner {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partnerId; // 파트너 id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "std_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "partner")
    private Activity activity;

    private String partnerName; // 파트너 이름

    private String partnerBirth;    // 파트너 출생일

    private boolean partnerDivision; // 파트너 구분

    private String partnerDetail;   // 파트너 세부 정보(임산부, 장애인, 아동, 일반인)

    private String gender;  // 파트너 성별

    private String partnerPhoto;    // 사진

    private String selectionReason; // 선정이유

    private String relationship;    // 관계

    public void changePartnerName(String partnerName) {
        this.partnerName = partnerName;
        System.out.println("파트너 이름 변경");
    }

    public void changePartnerDetail(String partnerDetail) {
        this.partnerDetail = partnerDetail;

        if (partnerDetail.equals("ordinary")) {
            this.partnerDivision = false;
        } else {
            this.partnerDivision = true;
        }
    }

    public void changePartnerSelectionReason(String selectionReason) {
        this.selectionReason = selectionReason;
    }

    public void changePartnerRelationship(String relationship) {
        this.relationship = relationship;
    }

    public void changePartnerGender(String gender) {
        this.gender = gender;
    }

    public void changePartnerBirth(String partnerBirth) {
        this.partnerBirth = partnerBirth;
    }

}
