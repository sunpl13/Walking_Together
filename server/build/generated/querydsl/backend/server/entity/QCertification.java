package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCertification is a Querydsl query type for Certification
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCertification extends EntityPathBase<Certification> {

    private static final long serialVersionUID = 974664512L;

    public static final QCertification certification = new QCertification("certification");

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
        super(Certification.class, forVariable(variable));
    }

    public QCertification(Path<? extends Certification> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCertification(PathMetadata metadata) {
        super(Certification.class, metadata);
    }

}

