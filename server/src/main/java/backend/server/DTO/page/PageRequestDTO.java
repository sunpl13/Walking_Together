package backend.server.DTO.page;

import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@AllArgsConstructor
@Setter
@Getter
@Builder
@Data
public class PageRequestDTO {   // Pageable 객체를 생성하기 위한 DTO

    private int page;
    private int size;
    private String keyword;

    public PageRequestDTO() {
        this.page = 1;
        this.size = 10;
    }

    public Pageable getPageable(Sort sort) {

        return PageRequest.of(page -1, size, sort);
    }

}
