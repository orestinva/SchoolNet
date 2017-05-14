package com.inva.hipstertest.service.impl;

import com.inva.hipstertest.service.AttendancesService;
import com.inva.hipstertest.domain.Attendances;
import com.inva.hipstertest.repository.AttendancesRepository;
import com.inva.hipstertest.service.dto.AttendancesDTO;
import com.inva.hipstertest.service.mapper.AttendancesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Attendances.
 */
@Service
@Transactional
public class AttendancesServiceImpl implements AttendancesService{

    private final Logger log = LoggerFactory.getLogger(AttendancesServiceImpl.class);
    
    private final AttendancesRepository attendancesRepository;

    private final AttendancesMapper attendancesMapper;

    public AttendancesServiceImpl(AttendancesRepository attendancesRepository, AttendancesMapper attendancesMapper) {
        this.attendancesRepository = attendancesRepository;
        this.attendancesMapper = attendancesMapper;
    }

    /**
     * Save a attendances.
     *
     * @param attendancesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AttendancesDTO save(AttendancesDTO attendancesDTO) {
        log.debug("Request to save Attendances : {}", attendancesDTO);
        Attendances attendances = attendancesMapper.attendancesDTOToAttendances(attendancesDTO);
        attendances = attendancesRepository.save(attendances);
        AttendancesDTO result = attendancesMapper.attendancesToAttendancesDTO(attendances);
        return result;
    }

    /**
     *  Get all the attendances.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AttendancesDTO> findAll() {
        log.debug("Request to get all Attendances");
        List<AttendancesDTO> result = attendancesRepository.findAll().stream()
            .map(attendancesMapper::attendancesToAttendancesDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one attendances by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AttendancesDTO findOne(Long id) {
        log.debug("Request to get Attendances : {}", id);
        Attendances attendances = attendancesRepository.findOne(id);
        AttendancesDTO attendancesDTO = attendancesMapper.attendancesToAttendancesDTO(attendances);
        return attendancesDTO;
    }

    /**
     *  Delete the  attendances by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Attendances : {}", id);
        attendancesRepository.delete(id);
    }
}
