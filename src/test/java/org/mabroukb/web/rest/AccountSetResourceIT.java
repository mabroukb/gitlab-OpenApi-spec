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
import org.mabroukb.domain.AccountSet;
import org.mabroukb.repository.AccountSetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AccountSetResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AccountSetResourceIT {

    private static final String DEFAULT_ACCOUNT_SET_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_SET_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SUPER_SET_ID = "AAAAAAAAAA";
    private static final String UPDATED_SUPER_SET_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/account-sets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AccountSetRepository accountSetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountSetMockMvc;

    private AccountSet accountSet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountSet createEntity(EntityManager em) {
        AccountSet accountSet = new AccountSet()
            .accountSetId(DEFAULT_ACCOUNT_SET_ID)
            .name(DEFAULT_NAME)
            .superSetId(DEFAULT_SUPER_SET_ID)
            .path(DEFAULT_PATH);
        return accountSet;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountSet createUpdatedEntity(EntityManager em) {
        AccountSet accountSet = new AccountSet()
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .name(UPDATED_NAME)
            .superSetId(UPDATED_SUPER_SET_ID)
            .path(UPDATED_PATH);
        return accountSet;
    }

    @BeforeEach
    public void initTest() {
        accountSet = createEntity(em);
    }

    @Test
    @Transactional
    void createAccountSet() throws Exception {
        int databaseSizeBeforeCreate = accountSetRepository.findAll().size();
        // Create the AccountSet
        restAccountSetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountSet)))
            .andExpect(status().isCreated());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeCreate + 1);
        AccountSet testAccountSet = accountSetList.get(accountSetList.size() - 1);
        assertThat(testAccountSet.getAccountSetId()).isEqualTo(DEFAULT_ACCOUNT_SET_ID);
        assertThat(testAccountSet.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAccountSet.getSuperSetId()).isEqualTo(DEFAULT_SUPER_SET_ID);
        assertThat(testAccountSet.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    void createAccountSetWithExistingId() throws Exception {
        // Create the AccountSet with an existing ID
        accountSet.setId(1L);

        int databaseSizeBeforeCreate = accountSetRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountSetMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountSet)))
            .andExpect(status().isBadRequest());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAccountSets() throws Exception {
        // Initialize the database
        accountSetRepository.saveAndFlush(accountSet);

        // Get all the accountSetList
        restAccountSetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountSetId").value(hasItem(DEFAULT_ACCOUNT_SET_ID)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].superSetId").value(hasItem(DEFAULT_SUPER_SET_ID)))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH)));
    }

    @Test
    @Transactional
    void getAccountSet() throws Exception {
        // Initialize the database
        accountSetRepository.saveAndFlush(accountSet);

        // Get the accountSet
        restAccountSetMockMvc
            .perform(get(ENTITY_API_URL_ID, accountSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountSet.getId().intValue()))
            .andExpect(jsonPath("$.accountSetId").value(DEFAULT_ACCOUNT_SET_ID))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.superSetId").value(DEFAULT_SUPER_SET_ID))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH));
    }

    @Test
    @Transactional
    void getNonExistingAccountSet() throws Exception {
        // Get the accountSet
        restAccountSetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAccountSet() throws Exception {
        // Initialize the database
        accountSetRepository.saveAndFlush(accountSet);

        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();

        // Update the accountSet
        AccountSet updatedAccountSet = accountSetRepository.findById(accountSet.getId()).get();
        // Disconnect from session so that the updates on updatedAccountSet are not directly saved in db
        em.detach(updatedAccountSet);
        updatedAccountSet.accountSetId(UPDATED_ACCOUNT_SET_ID).name(UPDATED_NAME).superSetId(UPDATED_SUPER_SET_ID).path(UPDATED_PATH);

        restAccountSetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAccountSet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAccountSet))
            )
            .andExpect(status().isOk());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
        AccountSet testAccountSet = accountSetList.get(accountSetList.size() - 1);
        assertThat(testAccountSet.getAccountSetId()).isEqualTo(UPDATED_ACCOUNT_SET_ID);
        assertThat(testAccountSet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAccountSet.getSuperSetId()).isEqualTo(UPDATED_SUPER_SET_ID);
        assertThat(testAccountSet.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    void putNonExistingAccountSet() throws Exception {
        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();
        accountSet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountSetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accountSet.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAccountSet() throws Exception {
        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();
        accountSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAccountSet() throws Exception {
        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();
        accountSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountSet)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAccountSetWithPatch() throws Exception {
        // Initialize the database
        accountSetRepository.saveAndFlush(accountSet);

        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();

        // Update the accountSet using partial update
        AccountSet partialUpdatedAccountSet = new AccountSet();
        partialUpdatedAccountSet.setId(accountSet.getId());

        partialUpdatedAccountSet.accountSetId(UPDATED_ACCOUNT_SET_ID).name(UPDATED_NAME).path(UPDATED_PATH);

        restAccountSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountSet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountSet))
            )
            .andExpect(status().isOk());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
        AccountSet testAccountSet = accountSetList.get(accountSetList.size() - 1);
        assertThat(testAccountSet.getAccountSetId()).isEqualTo(UPDATED_ACCOUNT_SET_ID);
        assertThat(testAccountSet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAccountSet.getSuperSetId()).isEqualTo(DEFAULT_SUPER_SET_ID);
        assertThat(testAccountSet.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    void fullUpdateAccountSetWithPatch() throws Exception {
        // Initialize the database
        accountSetRepository.saveAndFlush(accountSet);

        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();

        // Update the accountSet using partial update
        AccountSet partialUpdatedAccountSet = new AccountSet();
        partialUpdatedAccountSet.setId(accountSet.getId());

        partialUpdatedAccountSet
            .accountSetId(UPDATED_ACCOUNT_SET_ID)
            .name(UPDATED_NAME)
            .superSetId(UPDATED_SUPER_SET_ID)
            .path(UPDATED_PATH);

        restAccountSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountSet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountSet))
            )
            .andExpect(status().isOk());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
        AccountSet testAccountSet = accountSetList.get(accountSetList.size() - 1);
        assertThat(testAccountSet.getAccountSetId()).isEqualTo(UPDATED_ACCOUNT_SET_ID);
        assertThat(testAccountSet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAccountSet.getSuperSetId()).isEqualTo(UPDATED_SUPER_SET_ID);
        assertThat(testAccountSet.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    void patchNonExistingAccountSet() throws Exception {
        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();
        accountSet.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, accountSet.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAccountSet() throws Exception {
        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();
        accountSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountSet))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAccountSet() throws Exception {
        int databaseSizeBeforeUpdate = accountSetRepository.findAll().size();
        accountSet.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSetMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(accountSet))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountSet in the database
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAccountSet() throws Exception {
        // Initialize the database
        accountSetRepository.saveAndFlush(accountSet);

        int databaseSizeBeforeDelete = accountSetRepository.findAll().size();

        // Delete the accountSet
        restAccountSetMockMvc
            .perform(delete(ENTITY_API_URL_ID, accountSet.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountSet> accountSetList = accountSetRepository.findAll();
        assertThat(accountSetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
