package com.inva.hipstertest.repository;

import com.inva.hipstertest.domain.Pupil;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Pupil entity.
 */
@SuppressWarnings("unused")
public interface PupilRepository extends JpaRepository<Pupil,Long> {

}
