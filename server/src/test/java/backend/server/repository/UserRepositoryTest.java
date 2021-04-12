package backend.server.repository;

import backend.server.DTO.myPage.MyPagePartnerDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    public void 파트너리스트() {
        List<List<Object>> partners = userRepository.getPartnerList("2015100885");

        System.out.println("-----------------------");
        System.out.println(partners);

        List<MyPagePartnerDTO> partnerList = new ArrayList<>();

        partners.forEach(partner -> {
            MyPagePartnerDTO myPagePartnerDTO = new MyPagePartnerDTO();
            myPagePartnerDTO.setPartnerName(partner.get(0).toString());
            myPagePartnerDTO.setPartnerDetail(partner.get(1).toString());
            myPagePartnerDTO.setPartnerBirth(partner.get(2).toString());
            myPagePartnerDTO.setPartnerId((Long)partner.get(3));

            partnerList.add(myPagePartnerDTO);
        });

        System.out.println("partnerList");
        System.out.println(partnerList);
    }
}