package backend.server.controller;

import backend.server.DTO.myPage.MyPageMemberDTO;
import backend.server.DTO.myPage.MyPagePartnerDTO;
import backend.server.entity.MemberProfilePictures;
import backend.server.repository.MemberProfilePicturesRepository;
import backend.server.s3.FileUploadService;
import backend.server.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class MyPageController {

    private final MyPageService myPageService;
    private final MemberProfilePicturesRepository profilePicturesRepository;

    @GetMapping("/mypage")
    public Map<String, Object> myPageMain(@RequestParam(value = "stdId") String stdId) {

        Map<String, Object> response = new HashMap<>();

        response.put("status", 200);
        response.put("message", "불러오기 성공");

        MyPageMemberDTO member = myPageService.myPageMain(stdId);

        if (member == null) {
            response.put("status", 400);
            response.put("message", "일치하는 회원이 없습니다.");
            return response;
        }

        MemberProfilePictures profilePicture = profilePicturesRepository.findMemberProfilePicturesByStdId(stdId);

        System.out.println(profilePicture);
        Map<String, Object> data = new HashMap<>();
        data.put("name", member.getName());
        data.put("department", member.getDepartment());
        data.put("totalTime", member.getTotalTime());
        data.put("profilePicture", profilePicture.getProfilePictureUrl());

        response.put("data", data);

        return response;
    }

    // 마이페이지-변경
    @PostMapping("/mypage/change")
    public Map<String, Object> myPageChange(@RequestParam(value = "stdId") @Nullable String stdId,
                                            @RequestParam(value = "password") @Nullable String password,
                                            @RequestParam(value = "department") @Nullable String department,
                                            @RequestParam(value = "profilePicture")@Nullable  MultipartFile profilePicture)
    {
        String updateResult = myPageService.update(stdId, password, department, profilePicture);

        Map<String, Object> response = new HashMap<>();

        if (updateResult == null) {
            response.put("status", 400);
            response.put("message", "회원 정보 찾을 수 없음");
            return response;
        }

        response.put("status", 200);
        response.put("message", "회원 정보 수정 완료");


        return response;
    }

    // 마이페이지 - 파트너
    @GetMapping("/mypage/partnerInfo")
    public Map<String, Object> myPagePartnerInfo(@RequestParam(value = "stdId") String stdId) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "파트너 리스트 출력 완료");

        List<MyPagePartnerDTO> myPagePartners = myPageService.myPagePartnerInfo(stdId);

        if(myPagePartners.isEmpty()) {
            response.put("status", 400);
            response.put("message" , "파트너가 존재하지 않습니다.");
        }

        List<Map<String,Object>> partnerList = new ArrayList<>();

        myPagePartners.forEach(p -> {
            HashMap<String, Object> partner = new HashMap<>();
            partner.put("partnerId", p.getPartnerId());
            partner.put("partnerName", p.getPartnerName());
            partner.put("partnerDetail", p.getPartnerDetail());
            partner.put("partnerBirth", p.getPartnerBirth());

            partnerList.add(partner);
        });

        response.put("partnerList", partnerList);

        return response;
    }

    // 마이페이지 -파트너 detail
    @GetMapping("/mypage/partnerInfo/detail")
    public Map<String, Object> myPagePartnerDetail(@RequestParam(value = "partnerId") Long partnerId) {

        Map<String,Object> response = new HashMap<>();

        MyPagePartnerDTO myPagePartnerInfo = myPageService.myPagePartnerDetail(partnerId);

        response.put("status", 200);
        response.put("message", "파트너 세부 조회 완료");

        if(myPagePartnerInfo == null) {
            response.put("status", 400);
            response.put("message", "파트너가 존재하지 않습니다.");
            return response;
        }

        Map<String, Object> data = new HashMap<>();
        data.put("partnerName", myPagePartnerInfo.getPartnerName());
        data.put("partnerDetail", myPagePartnerInfo.getPartnerDetail());
        data.put("partnerBirth", myPagePartnerInfo.getPartnerBirth());
        data.put("gender", myPagePartnerInfo.getGender());
        data.put("selectionReason", myPagePartnerInfo.getSelectionReason());
        data.put("relationship", myPagePartnerInfo.getRelationship());

        response.put("data", data);
        return response;
    }

    // 마이페이지 - 파트너 생성
    @PostMapping("/partner/create")
    public Map<String, Object> createPartner(@RequestParam(value = "stdId") String stdId,
                                             @RequestParam(value = "partnerName") String partnerName,
                                             @RequestParam(value = "partnerDetail") String partnerDetail,
                                             @RequestParam(value = "partnerPhoto") MultipartFile partnerPhoto,
                                             @RequestParam(value = "selectionReason") String selectionReason,
                                             @RequestParam(value = "relationship") String relationship,
                                             @RequestParam(value = "gender") String gender,
                                             @RequestParam(value = "partnerBirth") String partnerBirth) {

        StringBuffer stringBuffer = new StringBuffer();
        StringBuffer birth = stringBuffer.append(partnerBirth);
        birth.insert(4,"/");
        birth.insert(7,"/");

        MyPagePartnerDTO savePartner = MyPagePartnerDTO.builder()
                .stdId(stdId)
                .partnerName(partnerName)
                .partnerDetail(partnerDetail)
                .partnerBirth(birth.toString())
                .selectionReason(selectionReason)
                .relationship(relationship)
                .gender(gender)
                .build();

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "파트너 저장 완료");

        Long result = myPageService.createPartner(savePartner, partnerPhoto);
        if(result == null) {
            response.put("status", 400);
            response.put("message", "존재하지 않는 회원입니다.");
        }

        return response;
    }

    // 마이페이지 - 파트너 정보 수정
    @PostMapping("/partner/change")
    public Map<String, Object> changePartner(@RequestParam(value = "partnerId") Long partnerId,
                              @RequestParam(value = "partnerName") @Nullable String partnerName,
                              @RequestParam(value = "partnerDetail") @Nullable String partnerDetail,
                              @RequestParam(value = "selectionReason") @Nullable String selectionReason,
                              @RequestParam(value = "relationship") @Nullable String relationship,
                              @RequestParam(value = "gender") @Nullable String gender,
                              @RequestParam(value = "partnerBirth") @Nullable String partnerBirth,
                              @RequestParam(value = "partnerPhoto") @Nullable MultipartFile partnerPhoto)
    {

        Map<String ,Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "파트너 정보가 성공적으로 변경되었습니다.");

        MyPagePartnerDTO updatePartner = MyPagePartnerDTO.builder()
                .partnerId(partnerId)
                .partnerName(partnerName)
                .partnerDetail(partnerDetail)
                .partnerBirth(partnerBirth)
                .selectionReason(selectionReason)
                .relationship(relationship)
                .gender(gender)
                .build();

        Long updateResult = myPageService.updatePartner(updatePartner, partnerPhoto);

        if(updateResult == null) {
            response.put("status", 400);
            response.put("message", "변경 실패");
        }

        return response;
    }
}
