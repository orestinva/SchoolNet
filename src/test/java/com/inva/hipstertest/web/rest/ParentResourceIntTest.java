package com.inva.hipstertest.web.rest;

import com.inva.hipstertest.SchoolNetApp;

import com.inva.hipstertest.domain.Parent;
import com.inva.hipstertest.domain.User;
import com.inva.hipstertest.repository.ParentRepository;
import com.inva.hipstertest.service.ParentService;
import com.inva.hipstertest.service.dto.ParentDTO;
import com.inva.hipstertest.service.mapper.ParentMapper;
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
 * Test class for the ParentResource REST controller.
 *
 * @see ParentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolNetApp.class)
public class ParentResourceIntTest {

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private ParentMapper parentMapper;

    @Autowired
    private ParentService parentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParentMockMvc;

    private Parent parent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ParentResource parentResource = new ParentResource(parentService);
        this.restParentMockMvc = MockMvcBuilders.standaloneSetup(parentResource)
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
    public static Parent createEntity(EntityManager em) {
        Parent parent = new Parent()
            .enabled(DEFAULT_ENABLED);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        parent.setUser(user);
        return parent;
    }

    @Before
    public void initTest() {
        parent = createEntity(em);
    }

    @Test
    @Transactional
    public void createParent() throws Exception {
        int databaseSizeBeforeCreate = parentRepository.findAll().size();

        // Create the Parent
        ParentDTO parentDTO = parentMapper.parentToParentDTO(parent);
        restParentMockMvc.perform(post("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentDTO)))
            .andExpect(status().isCreated());

        // Validate the Parent in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeCreate + 1);
        Parent testParent = parentList.get(parentList.size() - 1);
        assertThat(testParent.isEnabled()).isEqualTo(DEFAULT_ENABLED);
    }

    @Test
    @Transactional
    public void createParentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parentRepository.findAll().size();

        // Create the Parent with an existing ID
        parent.setId(1L);
        ParentDTO parentDTO = parentMapper.parentToParentDTO(parent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParentMockMvc.perform(post("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEnabledIsRequired() throws Exception {
        int databaseSizeBeforeTest = parentRepository.findAll().size();
        // set the field null
        parent.setEnabled(null);

        // Create the Parent, which fails.
        ParentDTO parentDTO = parentMapper.parentToParentDTO(parent);

        restParentMockMvc.perform(post("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentDTO)))
            .andExpect(status().isBadRequest());

        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllParents() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);

        // Get all the parentList
        restParentMockMvc.perform(get("/api/parents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parent.getId().intValue())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())));
    }

    @Test
    @Transactional
    public void getParent() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);

        // Get the parent
        restParentMockMvc.perform(get("/api/parents/{id}", parent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parent.getId().intValue()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingParent() throws Exception {
        // Get the parent
        restParentMockMvc.perform(get("/api/parents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParent() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);
        int databaseSizeBeforeUpdate = parentRepository.findAll().size();

        // Update the parent
        Parent updatedParent = parentRepository.findOne(parent.getId());
        updatedParent
            .enabled(UPDATED_ENABLED);
        ParentDTO parentDTO = parentMapper.parentToParentDTO(updatedParent);

        restParentMockMvc.perform(put("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentDTO)))
            .andExpect(status().isOk());

        // Validate the Parent in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeUpdate);
        Parent testParent = parentList.get(parentList.size() - 1);
        assertThat(testParent.isEnabled()).isEqualTo(UPDATED_ENABLED);
    }

    @Test
    @Transactional
    public void updateNonExistingParent() throws Exception {
        int databaseSizeBeforeUpdate = parentRepository.findAll().size();

        // Create the Parent
        ParentDTO parentDTO = parentMapper.parentToParentDTO(parent);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restParentMockMvc.perform(put("/api/parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentDTO)))
            .andExpect(status().isCreated());

        // Validate the Parent in the database
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteParent() throws Exception {
        // Initialize the database
        parentRepository.saveAndFlush(parent);
        int databaseSizeBeforeDelete = parentRepository.findAll().size();

        // Get the parent
        restParentMockMvc.perform(delete("/api/parents/{id}", parent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Parent> parentList = parentRepository.findAll();
        assertThat(parentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parent.class);
    }
}
