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
import org.mabroukb.domain.RuleAttributePredicate;
import org.mabroukb.repository.RuleAttributePredicateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RuleAttributePredicateResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RuleAttributePredicateResourceIT {

    private static final String DEFAULT_RULE_ATTRIBUTE_PREDICATE_ID = "AAAAAAAAAA";
    private static final String UPDATED_RULE_ATTRIBUTE_PREDICATE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_RULE_ID = "AAAAAAAAAA";
    private static final String UPDATED_RULE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ATTRIBUTE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ATTRIBUTE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_OPERATOR = "AAAAAAAAAA";
    private static final String UPDATED_OPERATOR = "BBBBBBBBBB";

    private static final String DEFAULT_ATTRIBUTE_VALUES = "AAAAAAAAAA";
    private static final String UPDATED_ATTRIBUTE_VALUES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/rule-attribute-predicates";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RuleAttributePredicateRepository ruleAttributePredicateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRuleAttributePredicateMockMvc;

    private RuleAttributePredicate ruleAttributePredicate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RuleAttributePredicate createEntity(EntityManager em) {
        RuleAttributePredicate ruleAttributePredicate = new RuleAttributePredicate()
            .ruleAttributePredicateId(DEFAULT_RULE_ATTRIBUTE_PREDICATE_ID)
            .ruleId(DEFAULT_RULE_ID)
            .attributeName(DEFAULT_ATTRIBUTE_NAME)
            .operator(DEFAULT_OPERATOR)
            .attributeValues(DEFAULT_ATTRIBUTE_VALUES);
        return ruleAttributePredicate;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RuleAttributePredicate createUpdatedEntity(EntityManager em) {
        RuleAttributePredicate ruleAttributePredicate = new RuleAttributePredicate()
            .ruleAttributePredicateId(UPDATED_RULE_ATTRIBUTE_PREDICATE_ID)
            .ruleId(UPDATED_RULE_ID)
            .attributeName(UPDATED_ATTRIBUTE_NAME)
            .operator(UPDATED_OPERATOR)
            .attributeValues(UPDATED_ATTRIBUTE_VALUES);
        return ruleAttributePredicate;
    }

    @BeforeEach
    public void initTest() {
        ruleAttributePredicate = createEntity(em);
    }

    @Test
    @Transactional
    void createRuleAttributePredicate() throws Exception {
        int databaseSizeBeforeCreate = ruleAttributePredicateRepository.findAll().size();
        // Create the RuleAttributePredicate
        restRuleAttributePredicateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isCreated());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeCreate + 1);
        RuleAttributePredicate testRuleAttributePredicate = ruleAttributePredicateList.get(ruleAttributePredicateList.size() - 1);
        assertThat(testRuleAttributePredicate.getRuleAttributePredicateId()).isEqualTo(DEFAULT_RULE_ATTRIBUTE_PREDICATE_ID);
        assertThat(testRuleAttributePredicate.getRuleId()).isEqualTo(DEFAULT_RULE_ID);
        assertThat(testRuleAttributePredicate.getAttributeName()).isEqualTo(DEFAULT_ATTRIBUTE_NAME);
        assertThat(testRuleAttributePredicate.getOperator()).isEqualTo(DEFAULT_OPERATOR);
        assertThat(testRuleAttributePredicate.getAttributeValues()).isEqualTo(DEFAULT_ATTRIBUTE_VALUES);
    }

    @Test
    @Transactional
    void createRuleAttributePredicateWithExistingId() throws Exception {
        // Create the RuleAttributePredicate with an existing ID
        ruleAttributePredicate.setId(1L);

        int databaseSizeBeforeCreate = ruleAttributePredicateRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRuleAttributePredicateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRuleAttributePredicates() throws Exception {
        // Initialize the database
        ruleAttributePredicateRepository.saveAndFlush(ruleAttributePredicate);

        // Get all the ruleAttributePredicateList
        restRuleAttributePredicateMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ruleAttributePredicate.getId().intValue())))
            .andExpect(jsonPath("$.[*].ruleAttributePredicateId").value(hasItem(DEFAULT_RULE_ATTRIBUTE_PREDICATE_ID)))
            .andExpect(jsonPath("$.[*].ruleId").value(hasItem(DEFAULT_RULE_ID)))
            .andExpect(jsonPath("$.[*].attributeName").value(hasItem(DEFAULT_ATTRIBUTE_NAME)))
            .andExpect(jsonPath("$.[*].operator").value(hasItem(DEFAULT_OPERATOR)))
            .andExpect(jsonPath("$.[*].attributeValues").value(hasItem(DEFAULT_ATTRIBUTE_VALUES)));
    }

    @Test
    @Transactional
    void getRuleAttributePredicate() throws Exception {
        // Initialize the database
        ruleAttributePredicateRepository.saveAndFlush(ruleAttributePredicate);

        // Get the ruleAttributePredicate
        restRuleAttributePredicateMockMvc
            .perform(get(ENTITY_API_URL_ID, ruleAttributePredicate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ruleAttributePredicate.getId().intValue()))
            .andExpect(jsonPath("$.ruleAttributePredicateId").value(DEFAULT_RULE_ATTRIBUTE_PREDICATE_ID))
            .andExpect(jsonPath("$.ruleId").value(DEFAULT_RULE_ID))
            .andExpect(jsonPath("$.attributeName").value(DEFAULT_ATTRIBUTE_NAME))
            .andExpect(jsonPath("$.operator").value(DEFAULT_OPERATOR))
            .andExpect(jsonPath("$.attributeValues").value(DEFAULT_ATTRIBUTE_VALUES));
    }

    @Test
    @Transactional
    void getNonExistingRuleAttributePredicate() throws Exception {
        // Get the ruleAttributePredicate
        restRuleAttributePredicateMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRuleAttributePredicate() throws Exception {
        // Initialize the database
        ruleAttributePredicateRepository.saveAndFlush(ruleAttributePredicate);

        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();

        // Update the ruleAttributePredicate
        RuleAttributePredicate updatedRuleAttributePredicate = ruleAttributePredicateRepository
            .findById(ruleAttributePredicate.getId())
            .get();
        // Disconnect from session so that the updates on updatedRuleAttributePredicate are not directly saved in db
        em.detach(updatedRuleAttributePredicate);
        updatedRuleAttributePredicate
            .ruleAttributePredicateId(UPDATED_RULE_ATTRIBUTE_PREDICATE_ID)
            .ruleId(UPDATED_RULE_ID)
            .attributeName(UPDATED_ATTRIBUTE_NAME)
            .operator(UPDATED_OPERATOR)
            .attributeValues(UPDATED_ATTRIBUTE_VALUES);

        restRuleAttributePredicateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRuleAttributePredicate.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRuleAttributePredicate))
            )
            .andExpect(status().isOk());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
        RuleAttributePredicate testRuleAttributePredicate = ruleAttributePredicateList.get(ruleAttributePredicateList.size() - 1);
        assertThat(testRuleAttributePredicate.getRuleAttributePredicateId()).isEqualTo(UPDATED_RULE_ATTRIBUTE_PREDICATE_ID);
        assertThat(testRuleAttributePredicate.getRuleId()).isEqualTo(UPDATED_RULE_ID);
        assertThat(testRuleAttributePredicate.getAttributeName()).isEqualTo(UPDATED_ATTRIBUTE_NAME);
        assertThat(testRuleAttributePredicate.getOperator()).isEqualTo(UPDATED_OPERATOR);
        assertThat(testRuleAttributePredicate.getAttributeValues()).isEqualTo(UPDATED_ATTRIBUTE_VALUES);
    }

    @Test
    @Transactional
    void putNonExistingRuleAttributePredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();
        ruleAttributePredicate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleAttributePredicateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ruleAttributePredicate.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRuleAttributePredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();
        ruleAttributePredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAttributePredicateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRuleAttributePredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();
        ruleAttributePredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAttributePredicateMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRuleAttributePredicateWithPatch() throws Exception {
        // Initialize the database
        ruleAttributePredicateRepository.saveAndFlush(ruleAttributePredicate);

        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();

        // Update the ruleAttributePredicate using partial update
        RuleAttributePredicate partialUpdatedRuleAttributePredicate = new RuleAttributePredicate();
        partialUpdatedRuleAttributePredicate.setId(ruleAttributePredicate.getId());

        partialUpdatedRuleAttributePredicate
            .ruleAttributePredicateId(UPDATED_RULE_ATTRIBUTE_PREDICATE_ID)
            .ruleId(UPDATED_RULE_ID)
            .attributeName(UPDATED_ATTRIBUTE_NAME)
            .operator(UPDATED_OPERATOR);

        restRuleAttributePredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRuleAttributePredicate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRuleAttributePredicate))
            )
            .andExpect(status().isOk());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
        RuleAttributePredicate testRuleAttributePredicate = ruleAttributePredicateList.get(ruleAttributePredicateList.size() - 1);
        assertThat(testRuleAttributePredicate.getRuleAttributePredicateId()).isEqualTo(UPDATED_RULE_ATTRIBUTE_PREDICATE_ID);
        assertThat(testRuleAttributePredicate.getRuleId()).isEqualTo(UPDATED_RULE_ID);
        assertThat(testRuleAttributePredicate.getAttributeName()).isEqualTo(UPDATED_ATTRIBUTE_NAME);
        assertThat(testRuleAttributePredicate.getOperator()).isEqualTo(UPDATED_OPERATOR);
        assertThat(testRuleAttributePredicate.getAttributeValues()).isEqualTo(DEFAULT_ATTRIBUTE_VALUES);
    }

    @Test
    @Transactional
    void fullUpdateRuleAttributePredicateWithPatch() throws Exception {
        // Initialize the database
        ruleAttributePredicateRepository.saveAndFlush(ruleAttributePredicate);

        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();

        // Update the ruleAttributePredicate using partial update
        RuleAttributePredicate partialUpdatedRuleAttributePredicate = new RuleAttributePredicate();
        partialUpdatedRuleAttributePredicate.setId(ruleAttributePredicate.getId());

        partialUpdatedRuleAttributePredicate
            .ruleAttributePredicateId(UPDATED_RULE_ATTRIBUTE_PREDICATE_ID)
            .ruleId(UPDATED_RULE_ID)
            .attributeName(UPDATED_ATTRIBUTE_NAME)
            .operator(UPDATED_OPERATOR)
            .attributeValues(UPDATED_ATTRIBUTE_VALUES);

        restRuleAttributePredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRuleAttributePredicate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRuleAttributePredicate))
            )
            .andExpect(status().isOk());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
        RuleAttributePredicate testRuleAttributePredicate = ruleAttributePredicateList.get(ruleAttributePredicateList.size() - 1);
        assertThat(testRuleAttributePredicate.getRuleAttributePredicateId()).isEqualTo(UPDATED_RULE_ATTRIBUTE_PREDICATE_ID);
        assertThat(testRuleAttributePredicate.getRuleId()).isEqualTo(UPDATED_RULE_ID);
        assertThat(testRuleAttributePredicate.getAttributeName()).isEqualTo(UPDATED_ATTRIBUTE_NAME);
        assertThat(testRuleAttributePredicate.getOperator()).isEqualTo(UPDATED_OPERATOR);
        assertThat(testRuleAttributePredicate.getAttributeValues()).isEqualTo(UPDATED_ATTRIBUTE_VALUES);
    }

    @Test
    @Transactional
    void patchNonExistingRuleAttributePredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();
        ruleAttributePredicate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleAttributePredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ruleAttributePredicate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRuleAttributePredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();
        ruleAttributePredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAttributePredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRuleAttributePredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAttributePredicateRepository.findAll().size();
        ruleAttributePredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAttributePredicateMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ruleAttributePredicate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RuleAttributePredicate in the database
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRuleAttributePredicate() throws Exception {
        // Initialize the database
        ruleAttributePredicateRepository.saveAndFlush(ruleAttributePredicate);

        int databaseSizeBeforeDelete = ruleAttributePredicateRepository.findAll().size();

        // Delete the ruleAttributePredicate
        restRuleAttributePredicateMockMvc
            .perform(delete(ENTITY_API_URL_ID, ruleAttributePredicate.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RuleAttributePredicate> ruleAttributePredicateList = ruleAttributePredicateRepository.findAll();
        assertThat(ruleAttributePredicateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
