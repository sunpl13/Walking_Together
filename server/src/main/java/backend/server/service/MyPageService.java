package backend.server.service;

import backend.server.DTO.myPage.MyPageMemberDTO;
import backend.server.DTO.myPage.MyPagePartnerDTO;
import backend.server.entity.Member;
import backend.server.entity.MemberProfilePictures;
import backend.server.entity.Partner;
import backend.server.entity.PartnerPhotos;
import backend.server.repository.MemberProfilePicturesRepository;
import backend.server.repository.PartnerPhotosRepository;
import backend.server.repository.PartnerRepository;
import backend.server.repository.UserRepository;
import backend.server.s3.FileUploadService;
import backend.server.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MyPageService {

    private final UserRepository userRepository;
    private final PartnerRepository partnerRepository;
    private final MemberProfilePicturesRepository memberProfilePicturesRepository;
    private final PartnerPhotosRepository partnerPhotosRepository;
    private final FileUploadService fileUploadService;
    private final PasswordEncoder passwordEncoder;

    // 마이페이지 메인
    @Transactional(readOnly = true)
    public MyPageMemberDTO myPageMain(String stdId) {
        Optional<Member> memberByStdId = userRepository.findMemberByStdId(stdId);

        if(memberByStdId.isEmpty()) {
            return null;
        }

        Member memberEntity = memberByStdId.get();
        MyPageMemberDTO member = memberToDTO(memberEntity);

        return member;
    }

    private MyPageMemberDTO memberToDTO(Member member) {

        return MyPageMemberDTO.builder()
                .name(member.getName())
                .department(member.getDepartment())
                .profilePicture(member.getProfilePicture())
                .totalTime(member.getTotalTime())
                .build();
    }

    // 마이페이지 - 변경
    @Transactional
    public String update(String stdId, String password, String department, MultipartFile profilePicture) {

        Optional<Member> findMember = userRepository.findMemberByStdId(stdId);

        if (findMember.isEmpty()) {
            return null;
        }

        Member member = findMember.get();

        String changePassword = null;
        if (password != null) {
            changePassword = passwordEncoder.encode(password);
        }

        MyPageMemberDTO memberDTO = MyPageMemberDTO.builder()
                .department(department)
                .password(changePassword)
                .build();

        if (password != null) {
            member.changePassword(memberDTO.getPassword());
        }

        if (department != null) {
            member.changeDepartment(memberDTO.getDepartment());
        }

        if (profilePicture != null) {
            if(memberProfilePicturesRepository.findMemberProfilePicturesByStdId(stdId) == null) {
                fileUploadService.uploadProfilePictures(profilePicture, stdId);
            } else {
                MemberProfilePictures profilePictures =
                        memberProfilePicturesRepository.findMemberProfilePicturesByStdId(stdId);

                fileUploadService.deleteProfilePictures(stdId);
                memberProfilePicturesRepository.delete(profilePictures);
                fileUploadService.uploadProfilePictures(profilePicture, stdId);
            }
        }

        return stdId;
    }

    // 마이페이지- 파트너 (파트너 리스트 가져오기)
    @Transactional(readOnly = true)
    public List<MyPagePartnerDTO> myPagePartnerInfo(String stdId) {

        List<List<Object>> partners = userRepository.getPartnerList(stdId);
        List<MyPagePartnerDTO> partnerList = new ArrayList<>();

        partners.forEach(partner -> {
            MyPagePartnerDTO myPagePartnerDTO = new MyPagePartnerDTO();
            myPagePartnerDTO.setPartnerName(partner.get(0).toString());
            myPagePartnerDTO.setPartnerDetail(partner.get(1).toString());
            myPagePartnerDTO.setPartnerBirth(partner.get(2).toString());
            myPagePartnerDTO.setPartnerId((Long)partner.get(3));

            partnerList.add(myPagePartnerDTO);
        });

        return partnerList;
    }

    // 마이페이지 - 파트너 세부 정보
    @Transactional(readOnly = true)
    public MyPagePartnerDTO myPagePartnerDetail(Long partnerId) {

        Optional<Partner> partnerInformation = partnerRepository.getPartnerInformation(partnerId);

        if (partnerInformation.isEmpty()) {
            return null;
        }
        Partner partner = partnerInformation.get();

        return MyPagePartnerDTO.builder()
                .partnerName(partner.getPartnerName())
                .partnerDetail(partner.getPartnerDetail())
                .partnerBirth(partner.getPartnerBirth())
                .gender(partner.getGender())
                .selectionReason(partner.getSelectionReason())
                .relationship(partner.getRelationship())
                .build();
    }

    // 마이페이지 - 파트너 생성
    @Transactional
    public Long createPartner (MyPagePartnerDTO partnerDTO, MultipartFile partnerPhoto) {

        Partner partner = partnerDtoToEntity(partnerDTO);
        // 파트너 정보 저장 (사진 제외)
        Partner savedPartner = partnerRepository.save(partner);

        // 파트너 사진이 필수이면 없어도 됌
        if (partnerPhoto != null) {
            fileUploadService.uploadPartnerPhoto(partnerPhoto, savedPartner.getPartnerId());
        }

        return partner.getPartnerId();
    }

    private Partner partnerDtoToEntity(MyPagePartnerDTO partnerDTO) {

        String stdId = partnerDTO.getStdId();
        Optional<Member> member = userRepository.findMemberByStdId(stdId);

        if(member.isEmpty()) {
            return null;
        }

        int partnerDivision;

        if (partnerDTO.getPartnerDetail().equals("ordinary")) {
            partnerDivision = 0;
        } else {
            partnerDivision = 1;
        }

        return Partner.builder()
                .member(Member.builder().stdId(partnerDTO.getStdId()).build())
                .partnerName(partnerDTO.getPartnerName())
                .partnerBirth(partnerDTO.getPartnerBirth())
                .gender(partnerDTO.getGender())
                .selectionReason(partnerDTO.getSelectionReason())
                .partnerDetail(partnerDTO.getPartnerDetail())
                .relationship(partnerDTO.getRelationship())
                .partnerDivision(partnerDivision)
                .build();
    }

    // 파트너 수정
    @Transactional
    public Long updatePartner(MyPagePartnerDTO partnerDTO, MultipartFile partnerPhoto) {

        Optional<Partner> savedPartner = partnerRepository.findById(partnerDTO.getPartnerId());

        if(savedPartner.isEmpty()) {
            return null;
        }

        Partner partner = savedPartner.get();
        System.out.println(partner);

        if(partnerDTO.getPartnerDetail() != null) {
            partner.changePartnerDetail(partnerDTO.getPartnerDetail());
        }

        if(partnerDTO.getPartnerName() != null) {
            System.out.println("파트너 이름");
            partner.changePartnerName(partnerDTO.getPartnerName());
            System.out.println(partnerDTO.getPartnerName());
            System.out.println(partner.getPartnerName());
        }

        if(partnerDTO.getPartnerBirth() != null) {

            StringBuffer stringBuffer = new StringBuffer();
            StringBuffer birth = stringBuffer.append(partnerDTO.getPartnerBirth());

            birth.replace(4,5,"/");
            birth.replace(7,8,"/");

            partner.changePartnerBirth(birth.toString());
        }

        if(partnerDTO.getSelectionReason() != null) {
            partner.changePartnerSelectionReason(partnerDTO.getSelectionReason());
        }

        if(partnerDTO.getRelationship() != null) {
            partner.changePartnerRelationship(partnerDTO.getRelationship());
        }

        if(partnerDTO.getGender() != null) {
            partner.changePartnerGender(partnerDTO.getGender());
        }

        if (partnerPhoto != null) {
            PartnerPhotos partnerPhotos = partnerPhotosRepository.findPartnerPhotosByPartnerId(partnerDTO.getPartnerId());

            fileUploadService.deletePartnerPhoto(partnerDTO.getPartnerId());
            partnerPhotosRepository.delete(partnerPhotos);

            fileUploadService.uploadPartnerPhoto(partnerPhoto, partnerDTO.getPartnerId());
        }

        return partnerDTO.getPartnerId();
    }
}
