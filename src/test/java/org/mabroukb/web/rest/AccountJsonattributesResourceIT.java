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
import org.mabroukb.domain.AccountJsonattributes;
import org.mabroukb.repository.AccountJsonattributesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link AccountJsonattributesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AccountJsonattributesResourceIT {

    private static final String DEFAULT_ACCOUNT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_JSON = "AAAAAAAAAA";
    private static final String UPDATED_JSON = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_JSONATTRIBUTE_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_JSONATTRIBUTE_ID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/account-jsonattributes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AccountJsonattributesRepository accountJsonattributesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountJsonattributesMockMvc;

    private AccountJsonattributes accountJsonattributes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountJsonattributes createEntity(EntityManager em) {
        AccountJsonattributes accountJsonattributes = new AccountJsonattributes()
            .accountId(DEFAULT_ACCOUNT_ID)
            .json(DEFAULT_JSON)
            .accountJsonattributeId(DEFAULT_ACCOUNT_JSONATTRIBUTE_ID)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return accountJsonattributes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountJsonattributes createUpdatedEntity(EntityManager em) {
        AccountJsonattributes accountJsonattributes = new AccountJsonattributes()
            .accountId(UPDATED_ACCOUNT_ID)
            .json(UPDATED_JSON)
            .accountJsonattributeId(UPDATED_ACCOUNT_JSONATTRIBUTE_ID)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return accountJsonattributes;
    }

    @BeforeEach
    public void initTest() {
        accountJsonattributes = createEntity(em);
    }

    @Test
    @Transactional
    void createAccountJsonattributes() throws Exception {
        int databaseSizeBeforeCreate = accountJsonattributesRepository.findAll().size();
        // Create the AccountJsonattributes
        restAccountJsonattributesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isCreated());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeCreate + 1);
        AccountJsonattributes testAccountJsonattributes = accountJsonattributesList.get(accountJsonattributesList.size() - 1);
        assertThat(testAccountJsonattributes.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testAccountJsonattributes.getJson()).isEqualTo(DEFAULT_JSON);
        assertThat(testAccountJsonattributes.getAccountJsonattributeId()).isEqualTo(DEFAULT_ACCOUNT_JSONATTRIBUTE_ID);
        assertThat(testAccountJsonattributes.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testAccountJsonattributes.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    void createAccountJsonattributesWithExistingId() throws Exception {
        // Create the AccountJsonattributes with an existing ID
        accountJsonattributes.setId(1L);

        int databaseSizeBeforeCreate = accountJsonattributesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountJsonattributesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAccountJsonattributes() throws Exception {
        // Initialize the database
        accountJsonattributesRepository.saveAndFlush(accountJsonattributes);

        // Get all the accountJsonattributesList
        restAccountJsonattributesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountJsonattributes.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountId").value(hasItem(DEFAULT_ACCOUNT_ID)))
            .andExpect(jsonPath("$.[*].json").value(hasItem(DEFAULT_JSON.toString())))
            .andExpect(jsonPath("$.[*].accountJsonattributeId").value(hasItem(DEFAULT_ACCOUNT_JSONATTRIBUTE_ID)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getAccountJsonattributes() throws Exception {
        // Initialize the database
        accountJsonattributesRepository.saveAndFlush(accountJsonattributes);

        // Get the accountJsonattributes
        restAccountJsonattributesMockMvc
            .perform(get(ENTITY_API_URL_ID, accountJsonattributes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountJsonattributes.getId().intValue()))
            .andExpect(jsonPath("$.accountId").value(DEFAULT_ACCOUNT_ID))
            .andExpect(jsonPath("$.json").value(DEFAULT_JSON.toString()))
            .andExpect(jsonPath("$.accountJsonattributeId").value(DEFAULT_ACCOUNT_JSONATTRIBUTE_ID))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAccountJsonattributes() throws Exception {
        // Get the accountJsonattributes
        restAccountJsonattributesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAccountJsonattributes() throws Exception {
        // Initialize the database
        accountJsonattributesRepository.saveAndFlush(accountJsonattributes);

        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();

        // Update the accountJsonattributes
        AccountJsonattributes updatedAccountJsonattributes = accountJsonattributesRepository.findById(accountJsonattributes.getId()).get();
        // Disconnect from session so that the updates on updatedAccountJsonattributes are not directly saved in db
        em.detach(updatedAccountJsonattributes);
        updatedAccountJsonattributes
            .accountId(UPDATED_ACCOUNT_ID)
            .json(UPDATED_JSON)
            .accountJsonattributeId(UPDATED_ACCOUNT_JSONATTRIBUTE_ID)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restAccountJsonattributesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAccountJsonattributes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAccountJsonattributes))
            )
            .andExpect(status().isOk());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
        AccountJsonattributes testAccountJsonattributes = accountJsonattributesList.get(accountJsonattributesList.size() - 1);
        assertThat(testAccountJsonattributes.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountJsonattributes.getJson()).isEqualTo(UPDATED_JSON);
        assertThat(testAccountJsonattributes.getAccountJsonattributeId()).isEqualTo(UPDATED_ACCOUNT_JSONATTRIBUTE_ID);
        assertThat(testAccountJsonattributes.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testAccountJsonattributes.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void putNonExistingAccountJsonattributes() throws Exception {
        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();
        accountJsonattributes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountJsonattributesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accountJsonattributes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAccountJsonattributes() throws Exception {
        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();
        accountJsonattributes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountJsonattributesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAccountJsonattributes() throws Exception {
        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();
        accountJsonattributes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountJsonattributesMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAccountJsonattributesWithPatch() throws Exception {
        // Initialize the database
        accountJsonattributesRepository.saveAndFlush(accountJsonattributes);

        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();

        // Update the accountJsonattributes using partial update
        AccountJsonattributes partialUpdatedAccountJsonattributes = new AccountJsonattributes();
        partialUpdatedAccountJsonattributes.setId(accountJsonattributes.getId());

        partialUpdatedAccountJsonattributes.accountId(UPDATED_ACCOUNT_ID).endDate(UPDATED_END_DATE);

        restAccountJsonattributesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountJsonattributes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountJsonattributes))
            )
            .andExpect(status().isOk());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
        AccountJsonattributes testAccountJsonattributes = accountJsonattributesList.get(accountJsonattributesList.size() - 1);
        assertThat(testAccountJsonattributes.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountJsonattributes.getJson()).isEqualTo(DEFAULT_JSON);
        assertThat(testAccountJsonattributes.getAccountJsonattributeId()).isEqualTo(DEFAULT_ACCOUNT_JSONATTRIBUTE_ID);
        assertThat(testAccountJsonattributes.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testAccountJsonattributes.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void fullUpdateAccountJsonattributesWithPatch() throws Exception {
        // Initialize the database
        accountJsonattributesRepository.saveAndFlush(accountJsonattributes);

        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();

        // Update the accountJsonattributes using partial update
        AccountJsonattributes partialUpdatedAccountJsonattributes = new AccountJsonattributes();
        partialUpdatedAccountJsonattributes.setId(accountJsonattributes.getId());

        partialUpdatedAccountJsonattributes
            .accountId(UPDATED_ACCOUNT_ID)
            .json(UPDATED_JSON)
            .accountJsonattributeId(UPDATED_ACCOUNT_JSONATTRIBUTE_ID)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restAccountJsonattributesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountJsonattributes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountJsonattributes))
            )
            .andExpect(status().isOk());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
        AccountJsonattributes testAccountJsonattributes = accountJsonattributesList.get(accountJsonattributesList.size() - 1);
        assertThat(testAccountJsonattributes.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountJsonattributes.getJson()).isEqualTo(UPDATED_JSON);
        assertThat(testAccountJsonattributes.getAccountJsonattributeId()).isEqualTo(UPDATED_ACCOUNT_JSONATTRIBUTE_ID);
        assertThat(testAccountJsonattributes.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testAccountJsonattributes.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingAccountJsonattributes() throws Exception {
        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();
        accountJsonattributes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountJsonattributesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, accountJsonattributes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAccountJsonattributes() throws Exception {
        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();
        accountJsonattributes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountJsonattributesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAccountJsonattributes() throws Exception {
        int databaseSizeBeforeUpdate = accountJsonattributesRepository.findAll().size();
        accountJsonattributes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountJsonattributesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountJsonattributes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountJsonattributes in the database
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAccountJsonattributes() throws Exception {
        // Initialize the database
        accountJsonattributesRepository.saveAndFlush(accountJsonattributes);

        int databaseSizeBeforeDelete = accountJsonattributesRepository.findAll().size();

        // Delete the accountJsonattributes
        restAccountJsonattributesMockMvc
            .perform(delete(ENTITY_API_URL_ID, accountJsonattributes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountJsonattributes> accountJsonattributesList = accountJsonattributesRepository.findAll();
        assertThat(accountJsonattributesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
