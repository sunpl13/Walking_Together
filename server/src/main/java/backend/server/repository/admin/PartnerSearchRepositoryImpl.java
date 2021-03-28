package backend.server.repository.admin;

import backend.server.entity.Member;
import backend.server.entity.Partner;
import backend.server.entity.QMember;
import backend.server.entity.QPartner;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class PartnerSearchRepositoryImpl extends QuerydslRepositorySupport implements PartnerSearchRepository {

    public PartnerSearchRepositoryImpl() {
        super(Partner.class);
    }

    @Override
    public List<Tuple> partnerInfo(String keyword, String partnerDetail) {

        QPartner partner = QPartner.partner;
        QMember member = QMember.member;

        JPQLQuery<Partner> jpqlQuery = from(partner);
        jpqlQuery.leftJoin(member).on(member.eq(partner.member));

        JPQLQuery<Tuple> tuple = jpqlQuery.select(member.name, member.stdId, member.department, partner.partnerName,
                partner.gender, partner.partnerBirth, partner.relationship, partner.partnerDivision);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        BooleanExpression expression = partner.partnerId.isNotNull();

        booleanBuilder.and(expression);

        BooleanBuilder conditionBuilder = new BooleanBuilder();
        if (keyword != null) {
            conditionBuilder.and(member.name.contains(keyword));
            conditionBuilder.or(member.stdId.contains(keyword));
        }

        if(partnerDetail != null) {
            switch (partnerDetail) {
                case "d":
                    conditionBuilder.and(partner.partnerDetail.eq("disability"));
                    break;
                case "p":
                    conditionBuilder.and(partner.partnerDetail.eq("pregnant"));
                    break;
                case "c":
                    conditionBuilder.and(partner.partnerDetail.eq("child"));
                    break;
                case "o":
                    conditionBuilder.and(partner.partnerDetail.eq("ordinary"));
                    break;
            }
        }


        booleanBuilder.and(conditionBuilder);

        tuple.where(booleanBuilder);
        tuple.orderBy(member.name.asc());

        return tuple.fetch();
    }

}
