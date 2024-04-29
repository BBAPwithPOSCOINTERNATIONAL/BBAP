package com.bbap.hr.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPositionEntity is a Querydsl query type for PositionEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPositionEntity extends EntityPathBase<PositionEntity> {

    private static final long serialVersionUID = -2026197243L;

    public static final QPositionEntity positionEntity = new QPositionEntity("positionEntity");

    public final NumberPath<Integer> positionId = createNumber("positionId", Integer.class);

    public final StringPath positionName = createString("positionName");

    public QPositionEntity(String variable) {
        super(PositionEntity.class, forVariable(variable));
    }

    public QPositionEntity(Path<? extends PositionEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPositionEntity(PathMetadata metadata) {
        super(PositionEntity.class, metadata);
    }

}

