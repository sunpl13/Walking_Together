package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QNoticeAttachedFiles is a Querydsl query type for NoticeAttachedFiles
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QNoticeAttachedFiles extends EntityPathBase<NoticeAttachedFiles> {

    private static final long serialVersionUID = -2110452415L;

    public static final QNoticeAttachedFiles noticeAttachedFiles = new QNoticeAttachedFiles("noticeAttachedFiles");

    public final StringPath noticeAttachedFileName = createString("noticeAttachedFileName");

    public final NumberPath<Long> noticeAttachedFilesId = createNumber("noticeAttachedFilesId", Long.class);

    public final StringPath noticeAttachedFilesUrl = createString("noticeAttachedFilesUrl");

    public final NumberPath<Long> noticeId = createNumber("noticeId", Long.class);

    public QNoticeAttachedFiles(String variable) {
        super(NoticeAttachedFiles.class, forVariable(variable));
    }

    public QNoticeAttachedFiles(Path<? extends NoticeAttachedFiles> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNoticeAttachedFiles(PathMetadata metadata) {
        super(NoticeAttachedFiles.class, metadata);
    }

}

