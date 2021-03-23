package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -492415276L;

    public static final QMember member = new QMember("member1");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final BooleanPath activate = createBoolean("activate");

    public final ListPath<Activity, QActivity> activities = this.<Activity, QActivity>createList("activities", Activity.class, QActivity.class, PathInits.DIRECT2);

    public final SetPath<MemberRole, EnumPath<MemberRole>> authorities = this.<MemberRole, EnumPath<MemberRole>>createSet("authorities", MemberRole.class, EnumPath.class, PathInits.DIRECT2);

    public final StringPath birth = createString("birth");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDate = _super.createDate;

    public final StringPath department = createString("department");

    public final NumberPath<Long> distance = createNumber("distance", Long.class);

    public final StringPath email = createString("email");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modDate = _super.modDate;

    public final StringPath name = createString("name");

    public final ListPath<Partner, QPartner> partners = this.<Partner, QPartner>createList("partners", Partner.class, QPartner.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath pNumber = createString("pNumber");

    public final StringPath stdId = createString("stdId");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

