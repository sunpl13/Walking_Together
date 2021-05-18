package backend.server.controller;

import backend.server.DTO.notice.FormData;
import backend.server.DTO.notice.NoticeDTO;
import backend.server.DTO.notice.NoticeListDTO;
import backend.server.DTO.page.PageRequestDTO;
import backend.server.DTO.page.PageResultDTO;
import backend.server.entity.Notice;
import backend.server.exception.ApiException;
import backend.server.message.Message;
import backend.server.s3.FileUploadService;
import backend.server.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            throw new ApiException(HttpStatus.NOT_FOUND, "해당 페이지에 데이터가 존재하지 않습니다.", 400L);
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
    public ResponseEntity<Message> uploadImage(@RequestParam(value="attachedFiles") @Nullable List<MultipartFile> attachedFiles,
                                               @RequestParam(value="imageFiles") @Nullable List<MultipartFile> imageFiles,
                                               @RequestParam(value="title") String title,
                                               @RequestParam(value="content") String content)
    {

        Message resBody = new Message();
        resBody.setMessage("게시글 업로드 완료");

        NoticeDTO noticeDto = NoticeDTO.builder()
        .title(title)
        .content(content)
        .build();
        
        Long noticeId = noticeService.saveNotice(noticeDto);

        if (imageFiles != null) {
            for (MultipartFile file : imageFiles) {
                if (file.getSize() != 0) {
                    fileUploadService.uploadImage(file, noticeId);
                }
            }
        }

        if(attachedFiles != null) {
            for (MultipartFile file : attachedFiles) {
                if (file.getSize() != 0) {
                    fileUploadService.uploadAttached(file, noticeId);
                }
            }
        }

        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }

    // 공지사항 게시물 상세
    @GetMapping("/notice")
    public ResponseEntity<Message> detailNotice(@RequestParam(value = "noticeId") Long noticeId) {

        Message resBody = new Message();

        NoticeListDTO noticeDTO = noticeService.detailNotice(noticeId);
        if (noticeDTO == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "존재하지 않는 게시물입니다.", 400L);
        }

        List<ArrayList<String>> noticeFiles = noticeService.detailNoticeFiles(noticeId);

        ArrayList<String> imageFilesUrls = noticeFiles.get(0);
        ArrayList<String> attachedFilesUrls = noticeFiles.get(1);

        Map<String, Object> response = new HashMap<>();
        response.put("title", noticeDTO.getTitle());
        response.put("content", noticeDTO.getContent());
        response.put("createTime", noticeDTO.getDate().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        response.put("noticeId", noticeDTO.getNoticeId());
        response.put("imageFiles", imageFilesUrls);
        response.put("attachedFiles", attachedFilesUrls);

        resBody.setData(response);
        resBody.setMessage("불러오기 성공");
        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }

    // 공지사항 게시물 수정
    @GetMapping("/admin/update")
    public ResponseEntity<Message> updateNotice(@RequestParam(value = "noticeId") Long noticeId) {

        NoticeListDTO noticeDTO = noticeService.detailNotice(noticeId);

        if (noticeDTO == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "해당 게시글이 존재하지 않습니다.", 400L);
        }

        List<ArrayList<String>> noticeFiles = noticeService.detailNoticeFiles(noticeId);

        ArrayList<String> imageFilesUrls = noticeFiles.get(0);
        ArrayList<String> attachedFilesUrls = noticeFiles.get(1);

        Map<String, Object> response = new HashMap<>();
        response.put("title", noticeDTO.getTitle());
        response.put("content", noticeDTO.getContent());
        response.put("imageFiles", imageFilesUrls);
        response.put("attachedFiles", attachedFilesUrls);

        Message resBody = new Message();
        resBody.setMessage("불러오기 완료");
        resBody.setData(response);

        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }

    // 공지사항 게시물 삭제
    @GetMapping("/admin/delete")
    public ResponseEntity<Message> delete(@RequestParam(value = "noticeId") Long noticeId) {

        fileUploadService.deleteImageFile(noticeId);
        fileUploadService.deleteAttachedFile(noticeId);

        String result = noticeService.delete(noticeId);

        if(result == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "존재하지 않는 게시물입니다.", 400L);
        }

        Message resBody = new Message();
        resBody.setMessage("삭제 완료");
        resBody.setData(noticeId);

        return new ResponseEntity<>(resBody,null,HttpStatus.OK);
    }

    // 공지사항 게시물 수정
    @PostMapping("/admin/update")
    public ResponseEntity<Message> update(@RequestParam(value = "imageFiles") @Nullable List<MultipartFile> imageFiles,
                                      @RequestParam(value = "attachedFiles") @Nullable List<MultipartFile> attachedFiles,
                                      @RequestParam(value = "title") String title,
                                      @RequestParam(value = "content") String content,
                                      @RequestParam(value = "noticeId") Long noticeId){

        NoticeDTO noticeDTO = NoticeDTO.builder()
                .noticeId(noticeId)
                .title(title)
                .content(content)
                .build();

        String result = noticeService.update(noticeDTO);
        if(result == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "존재하지 않는 게시물입니다.", 400L);
        }

        fileUploadService.deleteImageFile(noticeId);
        noticeService.deleteImages(noticeId);
        fileUploadService.deleteAttachedFile(noticeId);
        noticeService.deleteAttachedFiles(noticeId);

        if(imageFiles != null) {
            for (MultipartFile file : imageFiles) {
                if (file.getSize() != 0) {
                    fileUploadService.uploadImage(file, noticeId);
                }
            }
        }

        if(attachedFiles != null) {
            for (MultipartFile file : attachedFiles) {
                if (file.getSize() != 0) {
                    fileUploadService.uploadAttached(file, noticeId);
                }
            }
        }

        Message resBody = new Message();
        resBody.setMessage("수정 완료");
        resBody.setData(noticeId);

        return new ResponseEntity<>(resBody, null, HttpStatus.OK);
    }



}
