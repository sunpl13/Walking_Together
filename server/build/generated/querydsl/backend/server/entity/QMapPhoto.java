package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMapPhoto is a Querydsl query type for MapPhoto
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QMapPhoto extends EntityPathBase<MapPhoto> {

    private static final long serialVersionUID = 49629168L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMapPhoto mapPhoto = new QMapPhoto("mapPhoto");

    public final QActivity activity;

    public final NumberPath<Long> mapPhotoId = createNumber("mapPhotoId", Long.class);

    public final StringPath photoURL = createString("photoURL");

    public QMapPhoto(String variable) {
        this(MapPhoto.class, forVariable(variable), INITS);
    }

    public QMapPhoto(Path<? extends MapPhoto> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMapPhoto(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMapPhoto(PathMetadata metadata, PathInits inits) {
        this(MapPhoto.class, metadata, inits);
    }

    public QMapPhoto(Class<? extends MapPhoto> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.activity = inits.isInitialized("activity") ? new QActivity(forProperty("activity"), inits.get("activity")) : null;
    }

}

