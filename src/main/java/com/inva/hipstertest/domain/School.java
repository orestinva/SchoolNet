package com.inva.hipstertest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A School.
 */
@Entity
@Table(name = "school")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class School implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "enabled", nullable = false)
    private Boolean enabled;

    @OneToMany(mappedBy = "school")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Classroom> classrooms = new HashSet<>();

    @OneToMany(mappedBy = "school")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Form> forms = new HashSet<>();

    @OneToMany(mappedBy = "school")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Teacher> teachers = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public School name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public School enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Classroom> getClassrooms() {
        return classrooms;
    }

    public School classrooms(Set<Classroom> classrooms) {
        this.classrooms = classrooms;
        return this;
    }

    public School addClassroom(Classroom classroom) {
        this.classrooms.add(classroom);
        classroom.setSchool(this);
        return this;
    }

    public School removeClassroom(Classroom classroom) {
        this.classrooms.remove(classroom);
        classroom.setSchool(null);
        return this;
    }

    public void setClassrooms(Set<Classroom> classrooms) {
        this.classrooms = classrooms;
    }

    public Set<Form> getForms() {
        return forms;
    }

    public School forms(Set<Form> forms) {
        this.forms = forms;
        return this;
    }

    public School addForm(Form form) {
        this.forms.add(form);
        form.setSchool(this);
        return this;
    }

    public School removeForm(Form form) {
        this.forms.remove(form);
        form.setSchool(null);
        return this;
    }

    public void setForms(Set<Form> forms) {
        this.forms = forms;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public School teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public School addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.setSchool(this);
        return this;
    }

    public School removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.setSchool(null);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        School school = (School) o;
        if (school.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, school.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "School{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", enabled='" + enabled + "'" +
            '}';
    }
}
