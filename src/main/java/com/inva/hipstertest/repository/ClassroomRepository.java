package com.inva.hipstertest.repository;

import com.inva.hipstertest.domain.Classroom;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Classroom entity.
 */
@SuppressWarnings("unused")
public interface ClassroomRepository extends JpaRepository<Classroom,Long> {

}
