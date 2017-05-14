package com.inva.hipstertest.web.rest;

import com.inva.hipstertest.SchoolNetApp;

import com.inva.hipstertest.domain.Classroom;
import com.inva.hipstertest.domain.School;
import com.inva.hipstertest.repository.ClassroomRepository;
import com.inva.hipstertest.service.ClassroomService;
import com.inva.hipstertest.service.dto.ClassroomDTO;
import com.inva.hipstertest.service.mapper.ClassroomMapper;
import com.inva.hipstertest.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClassroomResource REST controller.
 *
 * @see ClassroomResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolNetApp.class)
public class ClassroomResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private ClassroomMapper classroomMapper;

    @Autowired
    private ClassroomService classroomService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClassroomMockMvc;

    private Classroom classroom;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ClassroomResource classroomResource = new ClassroomResource(classroomService);
        this.restClassroomMockMvc = MockMvcBuilders.standaloneSetup(classroomResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Classroom createEntity(EntityManager em) {
        Classroom classroom = new Classroom()
            .name(DEFAULT_NAME)
            .enabled(DEFAULT_ENABLED);
        // Add required entity
        School school = SchoolResourceIntTest.createEntity(em);
        em.persist(school);
        em.flush();
        classroom.setSchool(school);
        return classroom;
    }

    @Before
    public void initTest() {
        classroom = createEntity(em);
    }

    @Test
    @Transactional
    public void createClassroom() throws Exception {
        int databaseSizeBeforeCreate = classroomRepository.findAll().size();

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.classroomToClassroomDTO(classroom);
        restClassroomMockMvc.perform(post("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isCreated());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeCreate + 1);
        Classroom testClassroom = classroomList.get(classroomList.size() - 1);
        assertThat(testClassroom.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testClassroom.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createClassroomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = classroomRepository.findAll().size();

        // Create the Classroom with an existing ID
        classroom.setId(1L);
        ClassroomDTO classroomDTO = classroomMapper.classroomToClassroomDTO(classroom);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassroomMockMvc.perform(post("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = classroomRepository.findAll().size();
        // set the field null
        classroom.setName(null);

        // Create the Classroom, which fails.
        ClassroomDTO classroomDTO = classroomMapper.classroomToClassroomDTO(classroom);

        restClassroomMockMvc.perform(post("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEnabledIsRequired() throws Exception {
        int databaseSizeBeforeTest = classroomRepository.findAll().size();
        // set the field null
        classroom.setEnabled(null);

        // Create the Classroom, which fails.
        ClassroomDTO classroomDTO = classroomMapper.classroomToClassroomDTO(classroom);

        restClassroomMockMvc.perform(post("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClassrooms() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        // Get all the classroomList
        restClassroomMockMvc.perform(get("/api/classrooms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classroom.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }

    @Test
    @Transactional
    public void getClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);

        // Get the classroom
        restClassroomMockMvc.perform(get("/api/classrooms/{id}", classroom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(classroom.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingClassroom() throws Exception {
        // Get the classroom
        restClassroomMockMvc.perform(get("/api/classrooms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);
        int databaseSizeBeforeUpdate = classroomRepository.findAll().size();

        // Update the classroom
        Classroom updatedClassroom = classroomRepository.findOne(classroom.getId());
        updatedClassroom
            .name(UPDATED_NAME)
            .enabled(UPDATED_ENABLED);
        ClassroomDTO classroomDTO = classroomMapper.classroomToClassroomDTO(updatedClassroom);

        restClassroomMockMvc.perform(put("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isOk());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeUpdate);
        Classroom testClassroom = classroomList.get(classroomList.size() - 1);
        assertThat(testClassroom.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testClassroom.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingClassroom() throws Exception {
        int databaseSizeBeforeUpdate = classroomRepository.findAll().size();

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.classroomToClassroomDTO(classroom);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClassroomMockMvc.perform(put("/api/classrooms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(classroomDTO)))
            .andExpect(status().isCreated());

        // Validate the Classroom in the database
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClassroom() throws Exception {
        // Initialize the database
        classroomRepository.saveAndFlush(classroom);
        int databaseSizeBeforeDelete = classroomRepository.findAll().size();

        // Get the classroom
        restClassroomMockMvc.perform(delete("/api/classrooms/{id}", classroom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Classroom> classroomList = classroomRepository.findAll();
        assertThat(classroomList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Classroom.class);
    }
}
