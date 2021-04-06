package backend.server.repository.querydsl;

import backend.server.DTO.page.PageRequestDTO;
import backend.server.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class MemberSearchRepositoryImpl extends QuerydslRepositorySupport implements MemberSearchRepository {

    public MemberSearchRepositoryImpl() {
        super(Member.class);
    }

    // 관리자 창에서 회원 검색 구현
    @Override
    public List<Tuple> memberDetail(String keyword) {

        QMember member = QMember.member;
        JPQLQuery<Member> jpqlQuery = from(member);

        JPQLQuery<Tuple> tuple = jpqlQuery.select(member.name, member.stdId, member.department,
                member.email, member.birth, member.pNumber);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        BooleanExpression expression = member.stdId.isNotNull();

        booleanBuilder.and(expression);

        if (keyword != null) {

            BooleanBuilder conditionBuilder = new BooleanBuilder();

            conditionBuilder.or(member.name.contains(keyword));
            conditionBuilder.or(member.stdId.contains(keyword));

            booleanBuilder.and(conditionBuilder);
        }

        tuple.where(booleanBuilder);
        List<Tuple> result = tuple.fetch();
        return result;
    }

}
