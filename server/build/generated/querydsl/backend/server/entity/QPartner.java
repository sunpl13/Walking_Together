package backend.server.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPartner is a Querydsl query type for Partner
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPartner extends EntityPathBase<Partner> {

    private static final long serialVersionUID = 173184974L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPartner partner = new QPartner("partner");

    public final QActivity activity;

    public final StringPath disabilityDivision = createString("disabilityDivision");

    public final StringPath gender = createString("gender");

    public final QMember member;

    public final StringPath partnerBirth = createString("partnerBirth");

    public final StringPath partnerDetail = createString("partnerDetail");

    public final BooleanPath partnerDivision = createBoolean("partnerDivision");

    public final NumberPath<Long> partnerId = createNumber("partnerId", Long.class);

    public final StringPath partnerName = createString("partnerName");

    public final StringPath partnerPhoto = createString("partnerPhoto");

    public final StringPath relationship = createString("relationship");

    public final StringPath selectionReason = createString("selectionReason");

    public QPartner(String variable) {
        this(Partner.class, forVariable(variable), INITS);
    }

    public QPartner(Path<? extends Partner> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPartner(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPartner(PathMetadata metadata, PathInits inits) {
        this(Partner.class, metadata, inits);
    }

    public QPartner(Class<? extends Partner> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.activity = inits.isInitialized("activity") ? new QActivity(forProperty("activity"), inits.get("activity")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

