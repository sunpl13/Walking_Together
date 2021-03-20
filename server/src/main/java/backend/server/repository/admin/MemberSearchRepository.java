package backend.server.repository.admin;

import com.querydsl.core.Tuple;

import java.util.List;

public interface MemberSearchRepository {

    public List<Tuple> memberDetail(String keyword);
}
