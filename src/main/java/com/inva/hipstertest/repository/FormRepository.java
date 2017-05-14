package com.inva.hipstertest.repository;

import com.inva.hipstertest.domain.Form;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Form entity.
 */
@SuppressWarnings("unused")
public interface FormRepository extends JpaRepository<Form,Long> {

}
