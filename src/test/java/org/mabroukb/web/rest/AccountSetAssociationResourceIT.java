package org.mabroukb.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mabroukb.IntegrationTest;
import org.mabroukb.domain.AccountSetAssociation;
import org.mabroukb.repository.AccountSetAssociationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AccountSetAssociationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AccountSetAssociationResourceIT {

    private static final String DEFAULT_ACCOUNT_SET_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_SET_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_ID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/account-set-associations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AccountSetAssociationRepository accountSetAssociationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountSetAssociationMockMvc;

    private AccountSetAssociation accountSetAssociation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountSetAssociation createEntity(EntityManager em) {
        AccountSetAssociation accountSetAssociation = new AccountSetAssociation()
            .accountSetId(DEFAULT_ACCOUNT_SET_ID)
            .accountId(DEFAULT_ACCOUNT_ID)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return accountSetAssociation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountSetAssociation createUpdatedEntity(EntityManager em) {
        AccountSetAssociation accountSetAssociation = new AccountSetAssociation()
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return accountSetAssociation;
    }

    @BeforeEach
    public void initTest() {
        accountSetAssociation = createEntity(em);
    }

    @Test
    @Transactional
    void createAccountSetAssociation() throws Exception {
        int databaseSizeBeforeCreate = accountSetAssociationRepository.findAll().size();
        // Create the AccountSetAssociation
        restAccountSetAssociationMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isCreated());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeCreate + 1);
        AccountSetAssociation testAccountSetAssociation = accountSetAssociationList.get(accountSetAssociationList.size() - 1);
        assertThat(testAccountSetAssociation.getAccountSetId()).isEqualTo(DEFAULT_ACCOUNT_SET_ID);
        assertThat(testAccountSetAssociation.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testAccountSetAssociation.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testAccountSetAssociation.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    void createAccountSetAssociationWithExistingId() throws Exception {
        // Create the AccountSetAssociation with an existing ID
        accountSetAssociation.setId(1L);

        int databaseSizeBeforeCreate = accountSetAssociationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountSetAssociationMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAccountSetAssociations() throws Exception {
        // Initialize the database
        accountSetAssociationRepository.saveAndFlush(accountSetAssociation);

        // Get all the accountSetAssociationList
        restAccountSetAssociationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountSetAssociation.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountSetId").value(hasItem(DEFAULT_ACCOUNT_SET_ID)))
            .andExpect(jsonPath("$.[*].accountId").value(hasItem(DEFAULT_ACCOUNT_ID)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getAccountSetAssociation() throws Exception {
        // Initialize the database
        accountSetAssociationRepository.saveAndFlush(accountSetAssociation);

        // Get the accountSetAssociation
        restAccountSetAssociationMockMvc
            .perform(get(ENTITY_API_URL_ID, accountSetAssociation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountSetAssociation.getId().intValue()))
            .andExpect(jsonPath("$.accountSetId").value(DEFAULT_ACCOUNT_SET_ID))
            .andExpect(jsonPath("$.accountId").value(DEFAULT_ACCOUNT_ID))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAccountSetAssociation() throws Exception {
        // Get the accountSetAssociation
        restAccountSetAssociationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAccountSetAssociation() throws Exception {
        // Initialize the database
        accountSetAssociationRepository.saveAndFlush(accountSetAssociation);

        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();

        // Update the accountSetAssociation
        AccountSetAssociation updatedAccountSetAssociation = accountSetAssociationRepository.findById(accountSetAssociation.getId()).get();
        // Disconnect from session so that the updates on updatedAccountSetAssociation are not directly saved in db
        em.detach(updatedAccountSetAssociation);
        updatedAccountSetAssociation
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restAccountSetAssociationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAccountSetAssociation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAccountSetAssociation))
            )
            .andExpect(status().isOk());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
        AccountSetAssociation testAccountSetAssociation = accountSetAssociationList.get(accountSetAssociationList.size() - 1);
        assertThat(testAccountSetAssociation.getAccountSetId()).isEqualTo(UPDATED_ACCOUNT_SET_ID);
        assertThat(testAccountSetAssociation.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountSetAssociation.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testAccountSetAssociation.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void putNonExistingAccountSetAssociation() throws Exception {
        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();
        accountSetAssociation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountSetAssociationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accountSetAssociation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAccountSetAssociation() throws Exception {
        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();
        accountSetAssociation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetAssociationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAccountSetAssociation() throws Exception {
        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();
        accountSetAssociation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetAssociationMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAccountSetAssociationWithPatch() throws Exception {
        // Initialize the database
        accountSetAssociationRepository.saveAndFlush(accountSetAssociation);

        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();

        // Update the accountSetAssociation using partial update
        AccountSetAssociation partialUpdatedAccountSetAssociation = new AccountSetAssociation();
        partialUpdatedAccountSetAssociation.setId(accountSetAssociation.getId());

        restAccountSetAssociationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountSetAssociation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountSetAssociation))
            )
            .andExpect(status().isOk());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
        AccountSetAssociation testAccountSetAssociation = accountSetAssociationList.get(accountSetAssociationList.size() - 1);
        assertThat(testAccountSetAssociation.getAccountSetId()).isEqualTo(DEFAULT_ACCOUNT_SET_ID);
        assertThat(testAccountSetAssociation.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testAccountSetAssociation.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testAccountSetAssociation.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    void fullUpdateAccountSetAssociationWithPatch() throws Exception {
        // Initialize the database
        accountSetAssociationRepository.saveAndFlush(accountSetAssociation);

        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();

        // Update the accountSetAssociation using partial update
        AccountSetAssociation partialUpdatedAccountSetAssociation = new AccountSetAssociation();
        partialUpdatedAccountSetAssociation.setId(accountSetAssociation.getId());

        partialUpdatedAccountSetAssociation
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .accountId(UPDATED_ACCOUNT_ID)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restAccountSetAssociationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountSetAssociation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountSetAssociation))
            )
            .andExpect(status().isOk());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
        AccountSetAssociation testAccountSetAssociation = accountSetAssociationList.get(accountSetAssociationList.size() - 1);
        assertThat(testAccountSetAssociation.getAccountSetId()).isEqualTo(UPDATED_ACCOUNT_SET_ID);
        assertThat(testAccountSetAssociation.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountSetAssociation.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testAccountSetAssociation.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingAccountSetAssociation() throws Exception {
        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();
        accountSetAssociation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountSetAssociationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, accountSetAssociation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAccountSetAssociation() throws Exception {
        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();
        accountSetAssociation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetAssociationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAccountSetAssociation() throws Exception {
        int databaseSizeBeforeUpdate = accountSetAssociationRepository.findAll().size();
        accountSetAssociation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetAssociationMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountSetAssociation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountSetAssociation in the database
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAccountSetAssociation() throws Exception {
        // Initialize the database
        accountSetAssociationRepository.saveAndFlush(accountSetAssociation);

        int databaseSizeBeforeDelete = accountSetAssociationRepository.findAll().size();

        // Delete the accountSetAssociation
        restAccountSetAssociationMockMvc
            .perform(delete(ENTITY_API_URL_ID, accountSetAssociation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountSetAssociation> accountSetAssociationList = accountSetAssociationRepository.findAll();
        assertThat(accountSetAssociationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
