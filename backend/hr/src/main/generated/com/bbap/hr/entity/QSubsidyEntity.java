package com.bbap.hr.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSubsidyEntity is a Querydsl query type for SubsidyEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSubsidyEntity extends EntityPathBase<SubsidyEntity> {

    private static final long serialVersionUID = 1460019125L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSubsidyEntity subsidyEntity = new QSubsidyEntity("subsidyEntity");

    public final TimePath<java.time.LocalTime> endTime = createTime("endTime", java.time.LocalTime.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> mealClassification = createNumber("mealClassification", Integer.class);

    public final TimePath<java.time.LocalTime> startTime = createTime("startTime", java.time.LocalTime.class);

    public final NumberPath<Integer> subsidy = createNumber("subsidy", Integer.class);

    public final QWorkplaceEntity workplace;

    public QSubsidyEntity(String variable) {
        this(SubsidyEntity.class, forVariable(variable), INITS);
    }

    public QSubsidyEntity(Path<? extends SubsidyEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSubsidyEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSubsidyEntity(PathMetadata metadata, PathInits inits) {
        this(SubsidyEntity.class, metadata, inits);
    }

    public QSubsidyEntity(Class<? extends SubsidyEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.workplace = inits.isInitialized("workplace") ? new QWorkplaceEntity(forProperty("workplace")) : null;
    }

}

