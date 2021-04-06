package backend.server.repository.querydsl;

import com.querydsl.core.Tuple;

import java.util.List;

public interface PartnerSearchRepository {

    public List<Tuple> partnerInfo(String keyword, String partnerDetail);
}
