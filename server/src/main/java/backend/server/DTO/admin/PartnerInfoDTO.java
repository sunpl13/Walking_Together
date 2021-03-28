package backend.server.DTO.admin;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartnerInfoDTO {
    //member.name, member.stdId, member.department, partner.partnerName,
    //                partner.gender, partner.partnerBirth, partner.relationship, partner.partnerDivision

    private String stdName;

    private String stdId;

    private String department;

    private String partnerName;

    private String partnerGender;

    private String partnerBirth;

    private String relationship;

    private String partnerDivision;
}
