package backend.server.repository.querydsl;

import com.querydsl.core.Tuple;

import java.util.List;

public interface MemberSearchRepository {

    public List<Tuple> memberDetail(String keyword);
}
