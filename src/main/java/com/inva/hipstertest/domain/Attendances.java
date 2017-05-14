package com.inva.hipstertest.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Attendances.
 */
@Entity
@Table(name = "attendances")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Attendances implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "grade")
    private Integer grade;

    @NotNull
    @Column(name = "enabled", nullable = false)
    private Boolean enabled;

    @ManyToOne(optional = false)
    @NotNull
    private Pupil pupil;

    @ManyToOne(optional = false)
    @NotNull
    private Schedule schedule;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGrade() {
        return grade;
    }

    public Attendances grade(Integer grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public Attendances enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Pupil getPupil() {
        return pupil;
    }

    public Attendances pupil(Pupil pupil) {
        this.pupil = pupil;
        return this;
    }

    public void setPupil(Pupil pupil) {
        this.pupil = pupil;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Attendances schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Attendances attendances = (Attendances) o;
        if (attendances.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, attendances.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Attendances{" +
            "id=" + id +
            ", grade='" + grade + "'" +
            ", enabled='" + enabled + "'" +
            '}';
    }
}
