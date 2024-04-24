package com.bbap.face.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "face")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FaceEntity {

	@Id
	@Column(name = "emp_id", nullable = false)
	private Integer empId;
}
