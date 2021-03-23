package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QActivity is a Querydsl query type for Activity
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QActivity extends EntityPathBase<Activity> {

    private static final long serialVersionUID = -1771202359L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QActivity activity = new QActivity("activity");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DateTimePath<java.time.LocalDateTime> activityDate = createDateTime("activityDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> activityDivision = createNumber("activityDivision", Integer.class);

    public final NumberPath<Long> activityId = createNumber("activityId", Long.class);

    public final BooleanPath activityStatus = createBoolean("activityStatus");

    public final QCertification certification;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createDate = _super.createDate;

    public final NumberPath<Long> distance = createNumber("distance", Long.class);

    public final StringPath endImage = createString("endImage");

    public final DateTimePath<java.time.LocalDateTime> endTime = createDateTime("endTime", java.time.LocalDateTime.class);

    public final QMap map;

    public final ListPath<MapPhoto, QMapPhoto> mapPhoto = this.<MapPhoto, QMapPhoto>createList("mapPhoto", MapPhoto.class, QMapPhoto.class, PathInits.DIRECT2);

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modDate = _super.modDate;

    public final QPartner partner;

    public final StringPath review = createString("review");

    public final StringPath startImage = createString("startImage");

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public QActivity(String variable) {
        this(Activity.class, forVariable(variable), INITS);
    }

    public QActivity(Path<? extends Activity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QActivity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QActivity(PathMetadata metadata, PathInits inits) {
        this(Activity.class, metadata, inits);
    }

    public QActivity(Class<? extends Activity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.certification = inits.isInitialized("certification") ? new QCertification(forProperty("certification"), inits.get("certification")) : null;
        this.map = inits.isInitialized("map") ? new QMap(forProperty("map"), inits.get("map")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
        this.partner = inits.isInitialized("partner") ? new QPartner(forProperty("partner"), inits.get("partner")) : null;
    }

}

