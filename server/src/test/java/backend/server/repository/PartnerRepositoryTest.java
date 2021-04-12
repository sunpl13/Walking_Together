package backend.server.repository;

import backend.server.DTO.admin.PartnerInfoDTO;
import backend.server.DTO.myPage.MyPagePartnerDTO;
import backend.server.entity.Partner;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PartnerRepositoryTest {

    @Autowired
    PartnerRepository partnerRepository;

    @Test
    public void 파트너세부정보() {

        Optional<Partner> partnerInformation = partnerRepository.getPartnerInformation(1L);
        Partner partner = partnerInformation.get();

        System.out.println(partner);


    }
}