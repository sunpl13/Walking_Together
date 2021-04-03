package backend.server.repository.admin;

import backend.server.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDate;
import java.util.List;

public class ActivitySearchRepositoryImpl extends QuerydslRepositorySupport implements ActivitySearchRepository {

    public ActivitySearchRepositoryImpl() {
        super(Activity.class);
    }

    // 관리자 - 활동조회
    @Override
    public List<Tuple> activityInfo(String keyword, LocalDate from, LocalDate to, int activityDivision) {

        QActivity activity = QActivity.activity;
        QMember member = QMember.member;
        QPartner partner = QPartner.partner;

        JPQLQuery<Activity> jpqlQuery = from(activity);
        jpqlQuery.leftJoin(member).on(member.eq(activity.member));
        jpqlQuery.leftJoin(partner).on(partner.eq(activity.partner));

        JPQLQuery<Tuple> tuple = jpqlQuery.select(member.name, member.department, member.stdId, activity.activityDate,
                activity.startTime, activity.activityId, activity.endTime, activity.distance, partner.partnerName);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        BooleanExpression expression = activity.activityId.isNotNull();

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

        if (activityDivision == 0) {
            conditionBuilder.and(activity.activityDivision.eq(0));
            booleanBuilder.and(conditionBuilder);
        } else if (activityDivision == 1) {
            conditionBuilder.and(activity.activityDivision.eq(1));
            booleanBuilder.and(conditionBuilder);
        } else if (activityDivision == 2) {
            conditionBuilder.or(activity.activityDivision.eq(0));
            conditionBuilder.or(activity.activityDivision.eq(1));
            booleanBuilder.and(conditionBuilder);
        }

        tuple.where(booleanBuilder);
        tuple.orderBy(member.name.asc());

        return tuple.fetch();

    }

    // 활동 상세 조회 ( 나중에 )
    @Override
    public List<Tuple> activityDetail(Long activityId) {

        QActivity activity = QActivity.activity;
        QMember member = QMember.member;
        QPartner partner = QPartner.partner;
        QMapCapture mapCapture = QMapCapture.mapCapture;

        JPQLQuery<Activity> jpqlQuery = from(activity);

        jpqlQuery.leftJoin(member).on(activity.member.eq(member));
        jpqlQuery.leftJoin(partner).on(activity.partner.eq(partner));
        jpqlQuery.leftJoin(mapCapture).on(mapCapture.activityId.eq(activity.activityId));

        JPQLQuery<Tuple> tuple = jpqlQuery.select(member.name, member.department, member.stdId, activity.activityDate,
                partner.partnerName, activity.review, mapCapture.mapCaptureUrl, activity.distance,
                activity.startTime, activity.endTime);

        tuple.where(activity.activityId.eq(activityId));

        List<Tuple> result = tuple.fetch();

        return result;
    }
}
