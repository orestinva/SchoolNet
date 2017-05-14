package com.inva.hipstertest.web.rest;

import com.inva.hipstertest.SchoolNetApp;

import com.inva.hipstertest.domain.Pupil;
import com.inva.hipstertest.domain.User;
import com.inva.hipstertest.domain.Form;
import com.inva.hipstertest.repository.PupilRepository;
import com.inva.hipstertest.service.PupilService;
import com.inva.hipstertest.service.dto.PupilDTO;
import com.inva.hipstertest.service.mapper.PupilMapper;
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
 * Test class for the PupilResource REST controller.
 *
 * @see PupilResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolNetApp.class)
public class PupilResourceIntTest {

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private PupilRepository pupilRepository;

    @Autowired
    private PupilMapper pupilMapper;

    @Autowired
    private PupilService pupilService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPupilMockMvc;

    private Pupil pupil;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PupilResource pupilResource = new PupilResource(pupilService);
        this.restPupilMockMvc = MockMvcBuilders.standaloneSetup(pupilResource)
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
    public static Pupil createEntity(EntityManager em) {
        Pupil pupil = new Pupil()
            .enabled(DEFAULT_ENABLED);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        pupil.setUser(user);
        // Add required entity
        Form form = FormResourceIntTest.createEntity(em);
        em.persist(form);
        em.flush();
        pupil.setForm(form);
        return pupil;
    }

    @Before
    public void initTest() {
        pupil = createEntity(em);
    }

    @Test
    @Transactional
    public void createPupil() throws Exception {
        int databaseSizeBeforeCreate = pupilRepository.findAll().size();

        // Create the Pupil
        PupilDTO pupilDTO = pupilMapper.pupilToPupilDTO(pupil);
        restPupilMockMvc.perform(post("/api/pupils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pupilDTO)))
            .andExpect(status().isCreated());

        // Validate the Pupil in the database
        List<Pupil> pupilList = pupilRepository.findAll();
        assertThat(pupilList).hasSize(databaseSizeBeforeCreate + 1);
        Pupil testPupil = pupilList.get(pupilList.size() - 1);
        assertThat(testPupil.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createPupilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pupilRepository.findAll().size();

        // Create the Pupil with an existing ID
        pupil.setId(1L);
        PupilDTO pupilDTO = pupilMapper.pupilToPupilDTO(pupil);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPupilMockMvc.perform(post("/api/pupils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pupilDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Pupil> pupilList = pupilRepository.findAll();
        assertThat(pupilList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEnabledIsRequired() throws Exception {
        int databaseSizeBeforeTest = pupilRepository.findAll().size();
        // set the field null
        pupil.setEnabled(null);

        // Create the Pupil, which fails.
        PupilDTO pupilDTO = pupilMapper.pupilToPupilDTO(pupil);

        restPupilMockMvc.perform(post("/api/pupils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pupilDTO)))
            .andExpect(status().isBadRequest());

        List<Pupil> pupilList = pupilRepository.findAll();
        assertThat(pupilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPupils() throws Exception {
        // Initialize the database
        pupilRepository.saveAndFlush(pupil);

        // Get all the pupilList
        restPupilMockMvc.perform(get("/api/pupils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pupil.getId().intValue())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }

    @Test
    @Transactional
    public void getPupil() throws Exception {
        // Initialize the database
        pupilRepository.saveAndFlush(pupil);

        // Get the pupil
        restPupilMockMvc.perform(get("/api/pupils/{id}", pupil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pupil.getId().intValue()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPupil() throws Exception {
        // Get the pupil
        restPupilMockMvc.perform(get("/api/pupils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePupil() throws Exception {
        // Initialize the database
        pupilRepository.saveAndFlush(pupil);
        int databaseSizeBeforeUpdate = pupilRepository.findAll().size();

        // Update the pupil
        Pupil updatedPupil = pupilRepository.findOne(pupil.getId());
        updatedPupil
            .enabled(UPDATED_ENABLED);
        PupilDTO pupilDTO = pupilMapper.pupilToPupilDTO(updatedPupil);

        restPupilMockMvc.perform(put("/api/pupils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pupilDTO)))
            .andExpect(status().isOk());

        // Validate the Pupil in the database
        List<Pupil> pupilList = pupilRepository.findAll();
        assertThat(pupilList).hasSize(databaseSizeBeforeUpdate);
        Pupil testPupil = pupilList.get(pupilList.size() - 1);
        assertThat(testPupil.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingPupil() throws Exception {
        int databaseSizeBeforeUpdate = pupilRepository.findAll().size();

        // Create the Pupil
        PupilDTO pupilDTO = pupilMapper.pupilToPupilDTO(pupil);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPupilMockMvc.perform(put("/api/pupils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pupilDTO)))
            .andExpect(status().isCreated());

        // Validate the Pupil in the database
        List<Pupil> pupilList = pupilRepository.findAll();
        assertThat(pupilList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePupil() throws Exception {
        // Initialize the database
        pupilRepository.saveAndFlush(pupil);
        int databaseSizeBeforeDelete = pupilRepository.findAll().size();

        // Get the pupil
        restPupilMockMvc.perform(delete("/api/pupils/{id}", pupil.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pupil> pupilList = pupilRepository.findAll();
        assertThat(pupilList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pupil.class);
    }
}
