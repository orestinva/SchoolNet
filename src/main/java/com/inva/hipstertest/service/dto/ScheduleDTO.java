package com.inva.hipstertest.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Schedule entity.
 */
public class ScheduleDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime date;

    private String homework;

    @NotNull
    private Integer lessonPosition;

    @NotNull
    private Boolean enabled;

    private Long lessonId;

    private Long formId;

    private Long classroomId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }
    public String getHomework() {
        return homework;
    }

    public void setHomework(String homework) {
        this.homework = homework;
    }
    public Integer getLessonPosition() {
        return lessonPosition;
    }

    public void setLessonPosition(Integer lessonPosition) {
        this.lessonPosition = lessonPosition;
    }
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public Long getFormId() {
        return formId;
    }

    public void setFormId(Long formId) {
        this.formId = formId;
    }

    public Long getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(Long classroomId) {
        this.classroomId = classroomId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ScheduleDTO scheduleDTO = (ScheduleDTO) o;

        if ( ! Objects.equals(id, scheduleDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScheduleDTO{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", homework='" + homework + "'" +
            ", lessonPosition='" + lessonPosition + "'" +
            ", enabled='" + enabled + "'" +
            '}';
    }
}
