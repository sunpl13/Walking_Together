package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMap is a Querydsl query type for Map
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMap extends EntityPathBase<Map> {

    private static final long serialVersionUID = 1963578210L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMap map = new QMap("map");

    public final QActivity activity;

    public final NumberPath<Long> distance = createNumber("distance", Long.class);

    public final NumberPath<Long> mapId = createNumber("mapId", Long.class);

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public QMap(String variable) {
        this(Map.class, forVariable(variable), INITS);
    }

    public QMap(Path<? extends Map> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMap(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMap(PathMetadata metadata, PathInits inits) {
        this(Map.class, metadata, inits);
    }

    public QMap(Class<? extends Map> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.activity = inits.isInitialized("activity") ? new QActivity(forProperty("activity"), inits.get("activity")) : null;
    }

}

