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
import org.mabroukb.domain.RuleAccountSetPredicate;
import org.mabroukb.repository.RuleAccountSetPredicateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RuleAccountSetPredicateResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RuleAccountSetPredicateResourceIT {

    private static final String DEFAULT_RULE_ACCOUNT_SET_PREDICATE_ID = "AAAAAAAAAA";
    private static final String UPDATED_RULE_ACCOUNT_SET_PREDICATE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_RULE_ID = "AAAAAAAAAA";
    private static final String UPDATED_RULE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_SET_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_SET_ID = "BBBBBBBBBB";

    private static final String DEFAULT_OPERATOR = "AAAAAAAAAA";
    private static final String UPDATED_OPERATOR = "BBBBBBBBBB";

    private static final String DEFAULT_PREDICATE_OPERAND = "AAAAAAAAAA";
    private static final String UPDATED_PREDICATE_OPERAND = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/rule-account-set-predicates";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RuleAccountSetPredicateRepository ruleAccountSetPredicateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRuleAccountSetPredicateMockMvc;

    private RuleAccountSetPredicate ruleAccountSetPredicate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RuleAccountSetPredicate createEntity(EntityManager em) {
        RuleAccountSetPredicate ruleAccountSetPredicate = new RuleAccountSetPredicate()
            .ruleAccountSetPredicateId(DEFAULT_RULE_ACCOUNT_SET_PREDICATE_ID)
            .ruleId(DEFAULT_RULE_ID)
            .accountSetId(DEFAULT_ACCOUNT_SET_ID)
            .operator(DEFAULT_OPERATOR)
            .predicateOperand(DEFAULT_PREDICATE_OPERAND);
        return ruleAccountSetPredicate;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RuleAccountSetPredicate createUpdatedEntity(EntityManager em) {
        RuleAccountSetPredicate ruleAccountSetPredicate = new RuleAccountSetPredicate()
            .ruleAccountSetPredicateId(UPDATED_RULE_ACCOUNT_SET_PREDICATE_ID)
            .ruleId(UPDATED_RULE_ID)
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .operator(UPDATED_OPERATOR)
            .predicateOperand(UPDATED_PREDICATE_OPERAND);
        return ruleAccountSetPredicate;
    }

    @BeforeEach
    public void initTest() {
        ruleAccountSetPredicate = createEntity(em);
    }

    @Test
    @Transactional
    void createRuleAccountSetPredicate() throws Exception {
        int databaseSizeBeforeCreate = ruleAccountSetPredicateRepository.findAll().size();
        // Create the RuleAccountSetPredicate
        restRuleAccountSetPredicateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isCreated());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeCreate + 1);
        RuleAccountSetPredicate testRuleAccountSetPredicate = ruleAccountSetPredicateList.get(ruleAccountSetPredicateList.size() - 1);
        assertThat(testRuleAccountSetPredicate.getRuleAccountSetPredicateId()).isEqualTo(DEFAULT_RULE_ACCOUNT_SET_PREDICATE_ID);
        assertThat(testRuleAccountSetPredicate.getRuleId()).isEqualTo(DEFAULT_RULE_ID);
        assertThat(testRuleAccountSetPredicate.getAccountSetId()).isEqualTo(DEFAULT_ACCOUNT_SET_ID);
        assertThat(testRuleAccountSetPredicate.getOperator()).isEqualTo(DEFAULT_OPERATOR);
        assertThat(testRuleAccountSetPredicate.getPredicateOperand()).isEqualTo(DEFAULT_PREDICATE_OPERAND);
    }

    @Test
    @Transactional
    void createRuleAccountSetPredicateWithExistingId() throws Exception {
        // Create the RuleAccountSetPredicate with an existing ID
        ruleAccountSetPredicate.setId(1L);

        int databaseSizeBeforeCreate = ruleAccountSetPredicateRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRuleAccountSetPredicateMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRuleAccountSetPredicates() throws Exception {
        // Initialize the database
        ruleAccountSetPredicateRepository.saveAndFlush(ruleAccountSetPredicate);

        // Get all the ruleAccountSetPredicateList
        restRuleAccountSetPredicateMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ruleAccountSetPredicate.getId().intValue())))
            .andExpect(jsonPath("$.[*].ruleAccountSetPredicateId").value(hasItem(DEFAULT_RULE_ACCOUNT_SET_PREDICATE_ID)))
            .andExpect(jsonPath("$.[*].ruleId").value(hasItem(DEFAULT_RULE_ID)))
            .andExpect(jsonPath("$.[*].accountSetId").value(hasItem(DEFAULT_ACCOUNT_SET_ID)))
            .andExpect(jsonPath("$.[*].operator").value(hasItem(DEFAULT_OPERATOR)))
            .andExpect(jsonPath("$.[*].predicateOperand").value(hasItem(DEFAULT_PREDICATE_OPERAND)));
    }

    @Test
    @Transactional
    void getRuleAccountSetPredicate() throws Exception {
        // Initialize the database
        ruleAccountSetPredicateRepository.saveAndFlush(ruleAccountSetPredicate);

        // Get the ruleAccountSetPredicate
        restRuleAccountSetPredicateMockMvc
            .perform(get(ENTITY_API_URL_ID, ruleAccountSetPredicate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ruleAccountSetPredicate.getId().intValue()))
            .andExpect(jsonPath("$.ruleAccountSetPredicateId").value(DEFAULT_RULE_ACCOUNT_SET_PREDICATE_ID))
            .andExpect(jsonPath("$.ruleId").value(DEFAULT_RULE_ID))
            .andExpect(jsonPath("$.accountSetId").value(DEFAULT_ACCOUNT_SET_ID))
            .andExpect(jsonPath("$.operator").value(DEFAULT_OPERATOR))
            .andExpect(jsonPath("$.predicateOperand").value(DEFAULT_PREDICATE_OPERAND));
    }

    @Test
    @Transactional
    void getNonExistingRuleAccountSetPredicate() throws Exception {
        // Get the ruleAccountSetPredicate
        restRuleAccountSetPredicateMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRuleAccountSetPredicate() throws Exception {
        // Initialize the database
        ruleAccountSetPredicateRepository.saveAndFlush(ruleAccountSetPredicate);

        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();

        // Update the ruleAccountSetPredicate
        RuleAccountSetPredicate updatedRuleAccountSetPredicate = ruleAccountSetPredicateRepository
            .findById(ruleAccountSetPredicate.getId())
            .get();
        // Disconnect from session so that the updates on updatedRuleAccountSetPredicate are not directly saved in db
        em.detach(updatedRuleAccountSetPredicate);
        updatedRuleAccountSetPredicate
            .ruleAccountSetPredicateId(UPDATED_RULE_ACCOUNT_SET_PREDICATE_ID)
            .ruleId(UPDATED_RULE_ID)
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .operator(UPDATED_OPERATOR)
            .predicateOperand(UPDATED_PREDICATE_OPERAND);

        restRuleAccountSetPredicateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRuleAccountSetPredicate.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRuleAccountSetPredicate))
            )
            .andExpect(status().isOk());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
        RuleAccountSetPredicate testRuleAccountSetPredicate = ruleAccountSetPredicateList.get(ruleAccountSetPredicateList.size() - 1);
        assertThat(testRuleAccountSetPredicate.getRuleAccountSetPredicateId()).isEqualTo(UPDATED_RULE_ACCOUNT_SET_PREDICATE_ID);
        assertThat(testRuleAccountSetPredicate.getRuleId()).isEqualTo(UPDATED_RULE_ID);
        assertThat(testRuleAccountSetPredicate.getAccountSetId()).isEqualTo(UPDATED_ACCOUNT_SET_ID);
        assertThat(testRuleAccountSetPredicate.getOperator()).isEqualTo(UPDATED_OPERATOR);
        assertThat(testRuleAccountSetPredicate.getPredicateOperand()).isEqualTo(UPDATED_PREDICATE_OPERAND);
    }

    @Test
    @Transactional
    void putNonExistingRuleAccountSetPredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();
        ruleAccountSetPredicate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleAccountSetPredicateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ruleAccountSetPredicate.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRuleAccountSetPredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();
        ruleAccountSetPredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAccountSetPredicateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRuleAccountSetPredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();
        ruleAccountSetPredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAccountSetPredicateMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRuleAccountSetPredicateWithPatch() throws Exception {
        // Initialize the database
        ruleAccountSetPredicateRepository.saveAndFlush(ruleAccountSetPredicate);

        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();

        // Update the ruleAccountSetPredicate using partial update
        RuleAccountSetPredicate partialUpdatedRuleAccountSetPredicate = new RuleAccountSetPredicate();
        partialUpdatedRuleAccountSetPredicate.setId(ruleAccountSetPredicate.getId());

        partialUpdatedRuleAccountSetPredicate
            .ruleId(UPDATED_RULE_ID)
            .operator(UPDATED_OPERATOR)
            .predicateOperand(UPDATED_PREDICATE_OPERAND);

        restRuleAccountSetPredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRuleAccountSetPredicate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRuleAccountSetPredicate))
            )
            .andExpect(status().isOk());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
        RuleAccountSetPredicate testRuleAccountSetPredicate = ruleAccountSetPredicateList.get(ruleAccountSetPredicateList.size() - 1);
        assertThat(testRuleAccountSetPredicate.getRuleAccountSetPredicateId()).isEqualTo(DEFAULT_RULE_ACCOUNT_SET_PREDICATE_ID);
        assertThat(testRuleAccountSetPredicate.getRuleId()).isEqualTo(UPDATED_RULE_ID);
        assertThat(testRuleAccountSetPredicate.getAccountSetId()).isEqualTo(DEFAULT_ACCOUNT_SET_ID);
        assertThat(testRuleAccountSetPredicate.getOperator()).isEqualTo(UPDATED_OPERATOR);
        assertThat(testRuleAccountSetPredicate.getPredicateOperand()).isEqualTo(UPDATED_PREDICATE_OPERAND);
    }

    @Test
    @Transactional
    void fullUpdateRuleAccountSetPredicateWithPatch() throws Exception {
        // Initialize the database
        ruleAccountSetPredicateRepository.saveAndFlush(ruleAccountSetPredicate);

        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();

        // Update the ruleAccountSetPredicate using partial update
        RuleAccountSetPredicate partialUpdatedRuleAccountSetPredicate = new RuleAccountSetPredicate();
        partialUpdatedRuleAccountSetPredicate.setId(ruleAccountSetPredicate.getId());

        partialUpdatedRuleAccountSetPredicate
            .ruleAccountSetPredicateId(UPDATED_RULE_ACCOUNT_SET_PREDICATE_ID)
            .ruleId(UPDATED_RULE_ID)
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .operator(UPDATED_OPERATOR)
            .predicateOperand(UPDATED_PREDICATE_OPERAND);

        restRuleAccountSetPredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRuleAccountSetPredicate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRuleAccountSetPredicate))
            )
            .andExpect(status().isOk());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
        RuleAccountSetPredicate testRuleAccountSetPredicate = ruleAccountSetPredicateList.get(ruleAccountSetPredicateList.size() - 1);
        assertThat(testRuleAccountSetPredicate.getRuleAccountSetPredicateId()).isEqualTo(UPDATED_RULE_ACCOUNT_SET_PREDICATE_ID);
        assertThat(testRuleAccountSetPredicate.getRuleId()).isEqualTo(UPDATED_RULE_ID);
        assertThat(testRuleAccountSetPredicate.getAccountSetId()).isEqualTo(UPDATED_ACCOUNT_SET_ID);
        assertThat(testRuleAccountSetPredicate.getOperator()).isEqualTo(UPDATED_OPERATOR);
        assertThat(testRuleAccountSetPredicate.getPredicateOperand()).isEqualTo(UPDATED_PREDICATE_OPERAND);
    }

    @Test
    @Transactional
    void patchNonExistingRuleAccountSetPredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();
        ruleAccountSetPredicate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleAccountSetPredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ruleAccountSetPredicate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRuleAccountSetPredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();
        ruleAccountSetPredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAccountSetPredicateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isBadRequest());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRuleAccountSetPredicate() throws Exception {
        int databaseSizeBeforeUpdate = ruleAccountSetPredicateRepository.findAll().size();
        ruleAccountSetPredicate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleAccountSetPredicateMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ruleAccountSetPredicate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RuleAccountSetPredicate in the database
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRuleAccountSetPredicate() throws Exception {
        // Initialize the database
        ruleAccountSetPredicateRepository.saveAndFlush(ruleAccountSetPredicate);

        int databaseSizeBeforeDelete = ruleAccountSetPredicateRepository.findAll().size();

        // Delete the ruleAccountSetPredicate
        restRuleAccountSetPredicateMockMvc
            .perform(delete(ENTITY_API_URL_ID, ruleAccountSetPredicate.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RuleAccountSetPredicate> ruleAccountSetPredicateList = ruleAccountSetPredicateRepository.findAll();
        assertThat(ruleAccountSetPredicateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
