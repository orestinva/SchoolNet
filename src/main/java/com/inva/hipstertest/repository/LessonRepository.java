package com.inva.hipstertest.repository;

import com.inva.hipstertest.domain.Lesson;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Lesson entity.
 */
@SuppressWarnings("unused")
public interface LessonRepository extends JpaRepository<Lesson,Long> {

}
