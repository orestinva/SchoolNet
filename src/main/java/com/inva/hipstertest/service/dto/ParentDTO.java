package com.inva.hipstertest.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Parent entity.
 */
public class ParentDTO implements Serializable {

    private Long id;

    @NotNull
    private Boolean enabled;

    private Long userId;

    private Set<PupilDTO> pupils = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<PupilDTO> getPupils() {
        return pupils;
    }

    public void setPupils(Set<PupilDTO> pupils) {
        this.pupils = pupils;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ParentDTO parentDTO = (ParentDTO) o;

        if ( ! Objects.equals(id, parentDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ParentDTO{" +
            "id=" + id +
            ", enabled='" + enabled + "'" +
            '}';
    }
}
