package com.bbap.hr.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWorkplaceEntity is a Querydsl query type for WorkplaceEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWorkplaceEntity extends EntityPathBase<WorkplaceEntity> {

    private static final long serialVersionUID = 1130030752L;

    public static final QWorkplaceEntity workplaceEntity = new QWorkplaceEntity("workplaceEntity");

    public final NumberPath<Integer> workplaceId = createNumber("workplaceId", Integer.class);

    public final StringPath workplaceName = createString("workplaceName");

    public QWorkplaceEntity(String variable) {
        super(WorkplaceEntity.class, forVariable(variable));
    }

    public QWorkplaceEntity(Path<? extends WorkplaceEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWorkplaceEntity(PathMetadata metadata) {
        super(WorkplaceEntity.class, metadata);
    }

}

