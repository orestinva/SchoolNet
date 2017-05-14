package com.inva.hipstertest.service.mapper;

import com.inva.hipstertest.domain.*;
import com.inva.hipstertest.service.dto.ScheduleDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Schedule and its DTO ScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = {LessonMapper.class, FormMapper.class, ClassroomMapper.class, })
public interface ScheduleMapper {

    @Mapping(source = "lesson.id", target = "lessonId")
    @Mapping(source = "form.id", target = "formId")
    @Mapping(source = "classroom.id", target = "classroomId")
    ScheduleDTO scheduleToScheduleDTO(Schedule schedule);

    List<ScheduleDTO> schedulesToScheduleDTOs(List<Schedule> schedules);

    @Mapping(target = "attendances", ignore = true)
    @Mapping(source = "lessonId", target = "lesson")
    @Mapping(source = "formId", target = "form")
    @Mapping(source = "classroomId", target = "classroom")
    Schedule scheduleDTOToSchedule(ScheduleDTO scheduleDTO);

    List<Schedule> scheduleDTOsToSchedules(List<ScheduleDTO> scheduleDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Schedule scheduleFromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
    

}
