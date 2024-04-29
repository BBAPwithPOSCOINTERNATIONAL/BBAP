package com.bbap.hr.entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="department")
public class DepartmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="department_id")
    private Integer departmentId;

    @Column(name="department_name")
    private String departmentName;
}