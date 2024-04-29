package com.bbap.hr.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmployeeEntity is a Querydsl query type for EmployeeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmployeeEntity extends EntityPathBase<EmployeeEntity> {

    private static final long serialVersionUID = 825885898L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEmployeeEntity employeeEntity = new QEmployeeEntity("employeeEntity");

    public final QDepartmentEntity department;

    public final NumberPath<Integer> empId = createNumber("empId", Integer.class);

    public final StringPath empName = createString("empName");

    public final StringPath empNo = createString("empNo");

    public final StringPath password = createString("password");

    public final QPositionEntity position;

    public final QWorkplaceEntity workplace;

    public QEmployeeEntity(String variable) {
        this(EmployeeEntity.class, forVariable(variable), INITS);
    }

    public QEmployeeEntity(Path<? extends EmployeeEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEmployeeEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEmployeeEntity(PathMetadata metadata, PathInits inits) {
        this(EmployeeEntity.class, metadata, inits);
    }

    public QEmployeeEntity(Class<? extends EmployeeEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.department = inits.isInitialized("department") ? new QDepartmentEntity(forProperty("department")) : null;
        this.position = inits.isInitialized("position") ? new QPositionEntity(forProperty("position")) : null;
        this.workplace = inits.isInitialized("workplace") ? new QWorkplaceEntity(forProperty("workplace")) : null;
    }

}

