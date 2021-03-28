package backend.server.controller;

import backend.server.DTO.notice.FormData;
import backend.server.DTO.notice.NoticeDTO;
import backend.server.DTO.notice.NoticeListDTO;
import backend.server.DTO.page.PageRequestDTO;
import backend.server.DTO.page.PageResultDTO;
import backend.server.entity.Notice;
import backend.server.s3.FileUploadService;
import backend.server.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RestController
public class NoticeController {

    private final NoticeService noticeService;
    private final FileUploadService fileUploadService;

    // 공지사항 게시물 출력
    @PostMapping("/noticeList")
    public Map<String, Object> list(@RequestBody PageRequestDTO pageRequestDTO) {

        PageResultDTO<NoticeListDTO, Notice> result = noticeService.getList(pageRequestDTO);
        Map<String, Object> response = new HashMap<>();

        if(result.getTotalPage() < pageRequestDTO.getPage()) {
            response.put("status", 400);
            response.put("message", "해당 페이지에 데이터가 존재하지 않습니다.");
            return response;
        }

        Map<String, Object> pageInfo = new HashMap<>();

        pageInfo.put("page", result.getPage());
        pageInfo.put("totalPage", result.getTotalPage());
        pageInfo.put("start", result.getStart());
        pageInfo.put("end", result.getEnd());
        pageInfo.put("prev",result.isPrev());
        pageInfo.put("next", result.isNext());
        pageInfo.put("pageList", result.getPageList());

        response.put("status", 200);
        response.put("message", "성공");
        response.put("data", result.getDtoList());
        response.put("pageInfo", pageInfo);

        return response;
    }


    // 공지사항 등록 (이미지, 첨부파일 받아서 다른 DB에 각각 저장)
    @PostMapping("/admin/createpost")
    public void uploadImage(@RequestParam(value="attachedFiles") @Nullable List<MultipartFile> attachedFiles,
                            @RequestParam(value="imageFiles") @Nullable List<MultipartFile> imageFiles,
                            @RequestParam(value="title") String title,
                            @RequestParam(value="content") String content)
    {
        NoticeDTO noticeDto = NoticeDTO.builder()
        .title(title)
        .content(content)
        .build();
        
        Long noticeId = noticeService.saveNotice(noticeDto);

        for (MultipartFile file : imageFiles) {
            if(file.getSize()!=0) {
                fileUploadService.uploadImage(file, noticeId);
            }
        }


        for (MultipartFile file : attachedFiles) {
            if(file.getSize()!=0) {
                fileUploadService.uploadAttached(file, noticeId);
            }
        }
    }

    // 공지사항 게시물 상세
    @GetMapping("/notice")
    public Map<String, Object> detailNotice(@RequestParam(value = "noticeId") Long noticeId) {

        Map<String, Object> response = new HashMap<>();

        NoticeListDTO noticeDTO = noticeService.detailNotice(noticeId);
        List<ArrayList<String>> noticeFiles = noticeService.detailNoticeFiles(noticeId);

        ArrayList<String> imageFilesUrls = noticeFiles.get(0);
        ArrayList<String> attachedFilesUrls = noticeFiles.get(1);

        response.put("title", noticeDTO.getTitle());
        response.put("content", noticeDTO.getContent());
        response.put("createTime", noticeDTO.getDate().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        response.put("noticeId", noticeDTO.getNoticeId());
        response.put("imageFiles", imageFilesUrls);
        response.put("attachedFiles", attachedFilesUrls);

        return response;
    }

    // 공지사항 게시물 수정
    @GetMapping("/admin/update")
    public Map<String, Object> updateNotice(@RequestParam(value = "noticeId") Long noticeId) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "성공");

        NoticeListDTO noticeDTO = noticeService.detailNotice(noticeId);

        if (noticeDTO == null) {
            response.put("status", 400);
            response.put("message", "해당 게시글이 존재하지 않습니다.");

            return response;
        }

        List<ArrayList<String>> noticeFiles = noticeService.detailNoticeFiles(noticeId);

        ArrayList<String> imageFilesUrls = noticeFiles.get(0);
        ArrayList<String> attachedFilesUrls = noticeFiles.get(1);

        Map<String, Object> result = new HashMap<>();
        result.put("title", noticeDTO.getTitle());
        result.put("content", noticeDTO.getContent());
        result.put("imageFiles", imageFilesUrls);
        result.put("attachedFiles", attachedFilesUrls);

        response.put("data",result);

        return response;
    }

    // 공지사항 게시물 삭제
    @GetMapping("/admin/delete")
    public Map<String, Object> delete(@RequestParam(value = "noticeId") Long noticeId) {

        Map<String ,Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "성공");

        fileUploadService.deleteImageFile(noticeId);
        fileUploadService.deleteAttachedFile(noticeId);

        String result = noticeService.delete(noticeId);

        if(result == null) {
            response.put("status", 400);
            response.put("message", "존재하지 않는 게시물입니다.");
            return response;
        }
        return response;
    }

    // 공지사항 게시물 수정
    @PostMapping("/admin/update")
    public Map<String, Object> update(@RequestParam(value = "imageFiles") @Nullable List<MultipartFile> imageFiles,
                                      @RequestParam(value = "attachedFiles") @Nullable List<MultipartFile> attachedFiles,
                                      @RequestParam(value = "title") String title,
                                      @RequestParam(value = "content") String content,
                                      @RequestParam(value = "noticeId") Long noticeId){

        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("message", "수정완료");

        NoticeDTO noticeDTO = NoticeDTO.builder()
                .noticeId(noticeId)
                .title(title)
                .content(content)
                .build();

        String result = noticeService.update(noticeDTO);
        if(result == null) {
            response.put("status", 400);
            response.put("message", "존재하지 않는 게시물입니다.");
            return response;
        }

        fileUploadService.deleteImageFile(noticeId);
        noticeService.deleteImages(noticeId);
        fileUploadService.deleteAttachedFile(noticeId);
        noticeService.deleteAttachedFiles(noticeId);

        for (MultipartFile file : imageFiles) {
            if(file.getSize()!=0) {
                fileUploadService.uploadImage(file, noticeId);
            }
        }


        for (MultipartFile file : attachedFiles) {
            if(file.getSize()!=0) {
                fileUploadService.uploadAttached(file, noticeId);
            }
        }


        return response;
    }



}
