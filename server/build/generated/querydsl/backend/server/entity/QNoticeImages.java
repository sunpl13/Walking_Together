package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QNoticeImages is a Querydsl query type for NoticeImages
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QNoticeImages extends EntityPathBase<NoticeImages> {

    private static final long serialVersionUID = -1937458134L;

    public static final QNoticeImages noticeImages = new QNoticeImages("noticeImages");

    public final NumberPath<Long> noticeId = createNumber("noticeId", Long.class);

    public final NumberPath<Long> noticeImageId = createNumber("noticeImageId", Long.class);

    public final StringPath noticeImageName = createString("noticeImageName");

    public final StringPath noticeImageUrl = createString("noticeImageUrl");

    public QNoticeImages(String variable) {
        super(NoticeImages.class, forVariable(variable));
    }

    public QNoticeImages(Path<? extends NoticeImages> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNoticeImages(PathMetadata metadata) {
        super(NoticeImages.class, metadata);
    }

}

