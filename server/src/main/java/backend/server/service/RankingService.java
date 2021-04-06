package backend.server.service;

import backend.server.DTO.RankingDTO;
import backend.server.DTO.page.PageRequestDTO;
import backend.server.entity.Member;
import backend.server.entity.QMember;
import backend.server.repository.UserRepository;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final UserRepository userRepository;


    public List<RankingDTO> ranking() {

        Pageable pageable = PageRequest.of(0, 10, Sort.by("distance").descending());

        Page<Member> result = userRepository.findAll(pageable);

        List<RankingDTO> rankers = new ArrayList<>();

        result.get().forEach( ranker -> {
            RankingDTO dto = RankingDTO.builder()
                    .name(ranker.getName())
                    .department(ranker.getDepartment())
                    .stdId(ranker.getStdId())
                    .totalDistance(ranker.getDistance())
                    .build();

            rankers.add(dto);
        });

        return rankers;
    }
}
