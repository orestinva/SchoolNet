package com.inva.hipstertest.service.mapper;

import com.inva.hipstertest.domain.*;
import com.inva.hipstertest.service.dto.SchoolDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity School and its DTO SchoolDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SchoolMapper {

    SchoolDTO schoolToSchoolDTO(School school);

    List<SchoolDTO> schoolsToSchoolDTOs(List<School> schools);

    @Mapping(target = "classrooms", ignore = true)
    @Mapping(target = "forms", ignore = true)
    @Mapping(target = "teachers", ignore = true)
    School schoolDTOToSchool(SchoolDTO schoolDTO);

    List<School> schoolDTOsToSchools(List<SchoolDTO> schoolDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default School schoolFromId(Long id) {
        if (id == null) {
            return null;
        }
        School school = new School();
        school.setId(id);
        return school;
    }
    

}
