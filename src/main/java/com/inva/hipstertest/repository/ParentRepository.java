package com.inva.hipstertest.repository;

import com.inva.hipstertest.domain.Parent;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Parent entity.
 */
@SuppressWarnings("unused")
public interface ParentRepository extends JpaRepository<Parent,Long> {

    @Query("select distinct parent from Parent parent left join fetch parent.pupils")
    List<Parent> findAllWithEagerRelationships();

    @Query("select parent from Parent parent left join fetch parent.pupils where parent.id =:id")
    Parent findOneWithEagerRelationships(@Param("id") Long id);

}
