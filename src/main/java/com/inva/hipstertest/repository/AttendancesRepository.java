package com.inva.hipstertest.repository;

import com.inva.hipstertest.domain.Attendances;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Attendances entity.
 */
@SuppressWarnings("unused")
public interface AttendancesRepository extends JpaRepository<Attendances,Long> {

}
