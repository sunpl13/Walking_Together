package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCertification is a Querydsl query type for Certification
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCertification extends EntityPathBase<Certification> {

    private static final long serialVersionUID = 974664512L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCertification certification = new QCertification("certification");

    public final QActivity activity;

    public final DateTimePath<java.time.LocalDateTime> activityDate = createDateTime("activityDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> cetificationId = createNumber("cetificationId", Long.class);

    public final NumberPath<Long> conversionTime = createNumber("conversionTime", Long.class);

    public final StringPath department = createString("department");

    public final NumberPath<Long> distance = createNumber("distance", Long.class);

    public final StringPath endPhoto = createString("endPhoto");

    public final StringPath mapPhoto = createString("mapPhoto");

    public final StringPath memberName = createString("memberName");

    public final StringPath partnerName = createString("partnerName");

    public final StringPath review = createString("review");

    public final StringPath startPhoto = createString("startPhoto");

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> stdId = createNumber("stdId", Long.class);

    public QCertification(String variable) {
        this(Certification.class, forVariable(variable), INITS);
    }

    public QCertification(Path<? extends Certification> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCertification(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCertification(PathMetadata metadata, PathInits inits) {
        this(Certification.class, metadata, inits);
    }

    public QCertification(Class<? extends Certification> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.activity = inits.isInitialized("activity") ? new QActivity(forProperty("activity"), inits.get("activity")) : null;
    }

}

