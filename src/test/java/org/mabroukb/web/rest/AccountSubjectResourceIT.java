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
import org.mabroukb.domain.AccountSubject;
import org.mabroukb.repository.AccountSubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AccountSubjectResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AccountSubjectResourceIT {

    private static final String DEFAULT_ACCOUNT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_PRINCIPAL = "AAAAAAAAAA";
    private static final String UPDATED_PRINCIPAL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/account-subjects";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AccountSubjectRepository accountSubjectRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountSubjectMockMvc;

    private AccountSubject accountSubject;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountSubject createEntity(EntityManager em) {
        AccountSubject accountSubject = new AccountSubject().accountId(DEFAULT_ACCOUNT_ID).principal(DEFAULT_PRINCIPAL);
        return accountSubject;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountSubject createUpdatedEntity(EntityManager em) {
        AccountSubject accountSubject = new AccountSubject().accountId(UPDATED_ACCOUNT_ID).principal(UPDATED_PRINCIPAL);
        return accountSubject;
    }

    @BeforeEach
    public void initTest() {
        accountSubject = createEntity(em);
    }

    @Test
    @Transactional
    void createAccountSubject() throws Exception {
        int databaseSizeBeforeCreate = accountSubjectRepository.findAll().size();
        // Create the AccountSubject
        restAccountSubjectMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountSubject))
            )
            .andExpect(status().isCreated());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeCreate + 1);
        AccountSubject testAccountSubject = accountSubjectList.get(accountSubjectList.size() - 1);
        assertThat(testAccountSubject.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testAccountSubject.getPrincipal()).isEqualTo(DEFAULT_PRINCIPAL);
    }

    @Test
    @Transactional
    void createAccountSubjectWithExistingId() throws Exception {
        // Create the AccountSubject with an existing ID
        accountSubject.setId(1L);

        int databaseSizeBeforeCreate = accountSubjectRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountSubjectMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountSubject))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAccountSubjects() throws Exception {
        // Initialize the database
        accountSubjectRepository.saveAndFlush(accountSubject);

        // Get all the accountSubjectList
        restAccountSubjectMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountSubject.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountId").value(hasItem(DEFAULT_ACCOUNT_ID)))
            .andExpect(jsonPath("$.[*].principal").value(hasItem(DEFAULT_PRINCIPAL)));
    }

    @Test
    @Transactional
    void getAccountSubject() throws Exception {
        // Initialize the database
        accountSubjectRepository.saveAndFlush(accountSubject);

        // Get the accountSubject
        restAccountSubjectMockMvc
            .perform(get(ENTITY_API_URL_ID, accountSubject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountSubject.getId().intValue()))
            .andExpect(jsonPath("$.accountId").value(DEFAULT_ACCOUNT_ID))
            .andExpect(jsonPath("$.principal").value(DEFAULT_PRINCIPAL));
    }

    @Test
    @Transactional
    void getNonExistingAccountSubject() throws Exception {
        // Get the accountSubject
        restAccountSubjectMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAccountSubject() throws Exception {
        // Initialize the database
        accountSubjectRepository.saveAndFlush(accountSubject);

        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();

        // Update the accountSubject
        AccountSubject updatedAccountSubject = accountSubjectRepository.findById(accountSubject.getId()).get();
        // Disconnect from session so that the updates on updatedAccountSubject are not directly saved in db
        em.detach(updatedAccountSubject);
        updatedAccountSubject.accountId(UPDATED_ACCOUNT_ID).principal(UPDATED_PRINCIPAL);

        restAccountSubjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAccountSubject.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAccountSubject))
            )
            .andExpect(status().isOk());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
        AccountSubject testAccountSubject = accountSubjectList.get(accountSubjectList.size() - 1);
        assertThat(testAccountSubject.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountSubject.getPrincipal()).isEqualTo(UPDATED_PRINCIPAL);
    }

    @Test
    @Transactional
    void putNonExistingAccountSubject() throws Exception {
        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();
        accountSubject.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountSubjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, accountSubject.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSubject))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAccountSubject() throws Exception {
        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();
        accountSubject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSubjectMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(accountSubject))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAccountSubject() throws Exception {
        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();
        accountSubject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSubjectMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(accountSubject)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAccountSubjectWithPatch() throws Exception {
        // Initialize the database
        accountSubjectRepository.saveAndFlush(accountSubject);

        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();

        // Update the accountSubject using partial update
        AccountSubject partialUpdatedAccountSubject = new AccountSubject();
        partialUpdatedAccountSubject.setId(accountSubject.getId());

        partialUpdatedAccountSubject.accountId(UPDATED_ACCOUNT_ID);

        restAccountSubjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountSubject.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountSubject))
            )
            .andExpect(status().isOk());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
        AccountSubject testAccountSubject = accountSubjectList.get(accountSubjectList.size() - 1);
        assertThat(testAccountSubject.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountSubject.getPrincipal()).isEqualTo(DEFAULT_PRINCIPAL);
    }

    @Test
    @Transactional
    void fullUpdateAccountSubjectWithPatch() throws Exception {
        // Initialize the database
        accountSubjectRepository.saveAndFlush(accountSubject);

        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();

        // Update the accountSubject using partial update
        AccountSubject partialUpdatedAccountSubject = new AccountSubject();
        partialUpdatedAccountSubject.setId(accountSubject.getId());

        partialUpdatedAccountSubject.accountId(UPDATED_ACCOUNT_ID).principal(UPDATED_PRINCIPAL);

        restAccountSubjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAccountSubject.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAccountSubject))
            )
            .andExpect(status().isOk());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
        AccountSubject testAccountSubject = accountSubjectList.get(accountSubjectList.size() - 1);
        assertThat(testAccountSubject.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testAccountSubject.getPrincipal()).isEqualTo(UPDATED_PRINCIPAL);
    }

    @Test
    @Transactional
    void patchNonExistingAccountSubject() throws Exception {
        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();
        accountSubject.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountSubjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, accountSubject.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountSubject))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAccountSubject() throws Exception {
        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();
        accountSubject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSubjectMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(accountSubject))
            )
            .andExpect(status().isBadRequest());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAccountSubject() throws Exception {
        int databaseSizeBeforeUpdate = accountSubjectRepository.findAll().size();
        accountSubject.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAccountSubjectMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(accountSubject))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AccountSubject in the database
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAccountSubject() throws Exception {
        // Initialize the database
        accountSubjectRepository.saveAndFlush(accountSubject);

        int databaseSizeBeforeDelete = accountSubjectRepository.findAll().size();

        // Delete the accountSubject
        restAccountSubjectMockMvc
            .perform(delete(ENTITY_API_URL_ID, accountSubject.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountSubject> accountSubjectList = accountSubjectRepository.findAll();
        assertThat(accountSubjectList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
