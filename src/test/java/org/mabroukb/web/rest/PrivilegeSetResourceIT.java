package org.mabroukb.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mabroukb.IntegrationTest;
import org.mabroukb.domain.PrivilegeSet;
import org.mabroukb.repository.PrivilegeSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PrivilegeSetResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PrivilegeSetResourceIT {

    private static final String DEFAULT_PRIVILEGE_SET_ID = "AAAAAAAAAA";
    private static final String UPDATED_PRIVILEGE_SET_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PRIVILEGE = "AAAAAAAAAA";
    private static final String UPDATED_PRIVILEGE = "BBBBBBBBBB";

    private static final String DEFAULT_RULE_ID = "AAAAAAAAAA";
    private static final String UPDATED_RULE_ID = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/privilege-sets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PrivilegeSetRepository privilegeSetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrivilegeSetMockMvc;

    private PrivilegeSet privilegeSet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrivilegeSet createEntity(EntityManager em) {
        PrivilegeSet privilegeSet = new PrivilegeSet()
            .privilegeSetId(DEFAULT_PRIVILEGE_SET_ID)
            .privilege(DEFAULT_PRIVILEGE)
            .ruleId(DEFAULT_RULE_ID);
        return privilegeSet;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrivilegeSet createUpdatedEntity(EntityManager em) {
        PrivilegeSet privilegeSet = new PrivilegeSet()
            .privilegeSetId(UPDATED_PRIVILEGE_SET_ID)
            .privilege(UPDATED_PRIVILEGE)
            .ruleId(UPDATED_RULE_ID);
        return privilegeSet;
    }

    @BeforeEach
    public void initTest() {
        privilegeSet = createEntity(em);
    }

    @Test
    @Transactional
    void createPrivilegeSet() throws Exception {
        int databaseSizeBeforeCreate = privilegeSetRepository.findAll().size();
        // Create the PrivilegeSet
        restPrivilegeSetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(privilegeSet)))
            .andExpect(status().isCreated());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeCreate + 1);
        PrivilegeSet testPrivilegeSet = privilegeSetList.get(privilegeSetList.size() - 1);
        assertThat(testPrivilegeSet.getPrivilegeSetId()).isEqualTo(DEFAULT_PRIVILEGE_SET_ID);
        assertThat(testPrivilegeSet.getPrivilege()).isEqualTo(DEFAULT_PRIVILEGE);
        assertThat(testPrivilegeSet.getRuleId()).isEqualTo(DEFAULT_RULE_ID);
    }

    @Test
    @Transactional
    void createPrivilegeSetWithExistingId() throws Exception {
        // Create the PrivilegeSet with an existing ID
        privilegeSet.setId(1L);

        int databaseSizeBeforeCreate = privilegeSetRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrivilegeSetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(privilegeSet)))
            .andExpect(status().isBadRequest());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPrivilegeSets() throws Exception {
        // Initialize the database
        privilegeSetRepository.saveAndFlush(privilegeSet);

        // Get all the privilegeSetList
        restPrivilegeSetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(privilegeSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].privilegeSetId").value(hasItem(DEFAULT_PRIVILEGE_SET_ID)))
            .andExpect(jsonPath("$.[*].privilege").value(hasItem(DEFAULT_PRIVILEGE)))
            .andExpect(jsonPath("$.[*].ruleId").value(hasItem(DEFAULT_RULE_ID)));
    }

    @Test
    @Transactional
    void getPrivilegeSet() throws Exception {
        // Initialize the database
        privilegeSetRepository.saveAndFlush(privilegeSet);

        // Get the privilegeSet
        restPrivilegeSetMockMvc
            .perform(get(ENTITY_API_URL_ID, privilegeSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(privilegeSet.getId().intValue()))
            .andExpect(jsonPath("$.privilegeSetId").value(DEFAULT_PRIVILEGE_SET_ID))
            .andExpect(jsonPath("$.privilege").value(DEFAULT_PRIVILEGE))
            .andExpect(jsonPath("$.ruleId").value(DEFAULT_RULE_ID));
    }

    @Test
    @Transactional
    void getNonExistingPrivilegeSet() throws Exception {
        // Get the privilegeSet
        restPrivilegeSetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPrivilegeSet() throws Exception {
        // Initialize the database
        privilegeSetRepository.saveAndFlush(privilegeSet);

        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();

        // Update the privilegeSet
        PrivilegeSet updatedPrivilegeSet = privilegeSetRepository.findById(privilegeSet.getId()).get();
        // Disconnect from session so that the updates on updatedPrivilegeSet are not directly saved in db
        em.detach(updatedPrivilegeSet);
        updatedPrivilegeSet.privilegeSetId(UPDATED_PRIVILEGE_SET_ID).privilege(UPDATED_PRIVILEGE).ruleId(UPDATED_RULE_ID);

        restPrivilegeSetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPrivilegeSet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPrivilegeSet))
            )
            .andExpect(status().isOk());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
        PrivilegeSet testPrivilegeSet = privilegeSetList.get(privilegeSetList.size() - 1);
        assertThat(testPrivilegeSet.getPrivilegeSetId()).isEqualTo(UPDATED_PRIVILEGE_SET_ID);
        assertThat(testPrivilegeSet.getPrivilege()).isEqualTo(UPDATED_PRIVILEGE);
        assertThat(testPrivilegeSet.getRuleId()).isEqualTo(UPDATED_RULE_ID);
    }

    @Test
    @Transactional
    void putNonExistingPrivilegeSet() throws Exception {
        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();
        privilegeSet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrivilegeSetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, privilegeSet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(privilegeSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPrivilegeSet() throws Exception {
        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();
        privilegeSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrivilegeSetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(privilegeSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPrivilegeSet() throws Exception {
        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();
        privilegeSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrivilegeSetMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(privilegeSet)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePrivilegeSetWithPatch() throws Exception {
        // Initialize the database
        privilegeSetRepository.saveAndFlush(privilegeSet);

        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();

        // Update the privilegeSet using partial update
        PrivilegeSet partialUpdatedPrivilegeSet = new PrivilegeSet();
        partialUpdatedPrivilegeSet.setId(privilegeSet.getId());

        partialUpdatedPrivilegeSet.privilegeSetId(UPDATED_PRIVILEGE_SET_ID).ruleId(UPDATED_RULE_ID);

        restPrivilegeSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrivilegeSet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrivilegeSet))
            )
            .andExpect(status().isOk());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
        PrivilegeSet testPrivilegeSet = privilegeSetList.get(privilegeSetList.size() - 1);
        assertThat(testPrivilegeSet.getPrivilegeSetId()).isEqualTo(UPDATED_PRIVILEGE_SET_ID);
        assertThat(testPrivilegeSet.getPrivilege()).isEqualTo(DEFAULT_PRIVILEGE);
        assertThat(testPrivilegeSet.getRuleId()).isEqualTo(UPDATED_RULE_ID);
    }

    @Test
    @Transactional
    void fullUpdatePrivilegeSetWithPatch() throws Exception {
        // Initialize the database
        privilegeSetRepository.saveAndFlush(privilegeSet);

        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();

        // Update the privilegeSet using partial update
        PrivilegeSet partialUpdatedPrivilegeSet = new PrivilegeSet();
        partialUpdatedPrivilegeSet.setId(privilegeSet.getId());

        partialUpdatedPrivilegeSet.privilegeSetId(UPDATED_PRIVILEGE_SET_ID).privilege(UPDATED_PRIVILEGE).ruleId(UPDATED_RULE_ID);

        restPrivilegeSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrivilegeSet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrivilegeSet))
            )
            .andExpect(status().isOk());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
        PrivilegeSet testPrivilegeSet = privilegeSetList.get(privilegeSetList.size() - 1);
        assertThat(testPrivilegeSet.getPrivilegeSetId()).isEqualTo(UPDATED_PRIVILEGE_SET_ID);
        assertThat(testPrivilegeSet.getPrivilege()).isEqualTo(UPDATED_PRIVILEGE);
        assertThat(testPrivilegeSet.getRuleId()).isEqualTo(UPDATED_RULE_ID);
    }

    @Test
    @Transactional
    void patchNonExistingPrivilegeSet() throws Exception {
        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();
        privilegeSet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrivilegeSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, privilegeSet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(privilegeSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPrivilegeSet() throws Exception {
        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();
        privilegeSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrivilegeSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(privilegeSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPrivilegeSet() throws Exception {
        int databaseSizeBeforeUpdate = privilegeSetRepository.findAll().size();
        privilegeSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrivilegeSetMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(privilegeSet))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PrivilegeSet in the database
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePrivilegeSet() throws Exception {
        // Initialize the database
        privilegeSetRepository.saveAndFlush(privilegeSet);

        int databaseSizeBeforeDelete = privilegeSetRepository.findAll().size();

        // Delete the privilegeSet
        restPrivilegeSetMockMvc
            .perform(delete(ENTITY_API_URL_ID, privilegeSet.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrivilegeSet> privilegeSetList = privilegeSetRepository.findAll();
        assertThat(privilegeSetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
