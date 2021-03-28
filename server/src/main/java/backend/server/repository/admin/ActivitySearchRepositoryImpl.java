package backend.server.repository.admin;

import backend.server.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class ActivitySearchRepositoryImpl extends QuerydslRepositorySupport implements ActivitySearchRepository {

    public ActivitySearchRepositoryImpl() {
        super(Member.class);
    }

    // 관리자 - 활동조회
    @Override
    public List<Tuple> activityInfo(String keyword, LocalDate from, LocalDate to, boolean activityDivision) {

        QActivity activity = QActivity.activity;
        QMember member = QMember.member;
        QPartner partner = QPartner.partner;

        JPQLQuery<Activity> jpqlQuery = from(activity);
        jpqlQuery.leftJoin(member).on(member.eq(activity.member));
        jpqlQuery.leftJoin(partner).on(partner.eq(activity.partner));

        JPQLQuery<Tuple> tuple = jpqlQuery.select(member.name, member.department, member.stdId, activity.activityDate,
                activity.startTime, activity.activityId, activity.endTime, member.distance, partner.partnerName);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        BooleanExpression expression = member.stdId.isNotNull();

        booleanBuilder.and(expression);

        BooleanBuilder conditionBuilder = new BooleanBuilder();

        if(keyword != null) {
            conditionBuilder.and(member.stdId.contains(keyword));
            conditionBuilder.or(member.name.contains(keyword));

            booleanBuilder.and(conditionBuilder);
        }

        if(from != null && to != null) {

            conditionBuilder.and(activity.activityDate.between(from, to));

            booleanBuilder.and(conditionBuilder);
        }

        if (activityDivision) {
            conditionBuilder.and(activity.activityDivision.isTrue());
            booleanBuilder.and(conditionBuilder);
        } else {
            conditionBuilder.and(activity.activityDivision.isFalse());
            booleanBuilder.and(conditionBuilder);
        }

        tuple.where(booleanBuilder);
        tuple.orderBy(member.name.asc());

        return tuple.fetch();

    }

    // 활동 상세 조회 ( 나중에 )
    @Override
    public void activityDetail(Long activityId) {

        QActivity activity = QActivity.activity;
        QMember member = QMember.member;
        QPartner partner = QPartner.partner;

    }
}
