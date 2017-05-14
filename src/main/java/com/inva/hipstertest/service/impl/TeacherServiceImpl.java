package com.inva.hipstertest.service.impl;

import com.inva.hipstertest.service.TeacherService;
import com.inva.hipstertest.domain.Teacher;
import com.inva.hipstertest.repository.TeacherRepository;
import com.inva.hipstertest.service.dto.TeacherDTO;
import com.inva.hipstertest.service.mapper.TeacherMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Teacher.
 */
@Service
@Transactional
public class TeacherServiceImpl implements TeacherService{

    private final Logger log = LoggerFactory.getLogger(TeacherServiceImpl.class);
    
    private final TeacherRepository teacherRepository;

    private final TeacherMapper teacherMapper;

    public TeacherServiceImpl(TeacherRepository teacherRepository, TeacherMapper teacherMapper) {
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
    }

    /**
     * Save a teacher.
     *
     * @param teacherDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeacherDTO save(TeacherDTO teacherDTO) {
        log.debug("Request to save Teacher : {}", teacherDTO);
        Teacher teacher = teacherMapper.teacherDTOToTeacher(teacherDTO);
        teacher = teacherRepository.save(teacher);
        TeacherDTO result = teacherMapper.teacherToTeacherDTO(teacher);
        return result;
    }

    /**
     *  Get all the teachers.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TeacherDTO> findAll() {
        log.debug("Request to get all Teachers");
        List<TeacherDTO> result = teacherRepository.findAllWithEagerRelationships().stream()
            .map(teacherMapper::teacherToTeacherDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one teacher by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TeacherDTO findOne(Long id) {
        log.debug("Request to get Teacher : {}", id);
        Teacher teacher = teacherRepository.findOneWithEagerRelationships(id);
        TeacherDTO teacherDTO = teacherMapper.teacherToTeacherDTO(teacher);
        return teacherDTO;
    }

    /**
     *  Delete the  teacher by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Teacher : {}", id);
        teacherRepository.delete(id);
    }
}
