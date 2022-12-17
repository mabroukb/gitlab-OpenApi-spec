package org.mabroukb.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.mabroukb.domain.AccountSetAssociation;
import org.mabroukb.repository.AccountSetAssociationRepository;
import org.mabroukb.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.mabroukb.domain.AccountSetAssociation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AccountSetAssociationResource {

    private final Logger log = LoggerFactory.getLogger(AccountSetAssociationResource.class);

    private static final String ENTITY_NAME = "accountSetAssociation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccountSetAssociationRepository accountSetAssociationRepository;

    public AccountSetAssociationResource(AccountSetAssociationRepository accountSetAssociationRepository) {
        this.accountSetAssociationRepository = accountSetAssociationRepository;
    }

    /**
     * {@code POST  /account-set-associations} : Create a new accountSetAssociation.
     *
     * @param accountSetAssociation the accountSetAssociation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accountSetAssociation, or with status {@code 400 (Bad Request)} if the accountSetAssociation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/account-set-associations")
    public ResponseEntity<AccountSetAssociation> createAccountSetAssociation(@RequestBody AccountSetAssociation accountSetAssociation)
        throws URISyntaxException {
        log.debug("REST request to save AccountSetAssociation : {}", accountSetAssociation);
        if (accountSetAssociation.getId() != null) {
            throw new BadRequestAlertException("A new accountSetAssociation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountSetAssociation result = accountSetAssociationRepository.save(accountSetAssociation);
        return ResponseEntity
            .created(new URI("/api/account-set-associations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /account-set-associations/:id} : Updates an existing accountSetAssociation.
     *
     * @param id the id of the accountSetAssociation to save.
     * @param accountSetAssociation the accountSetAssociation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountSetAssociation,
     * or with status {@code 400 (Bad Request)} if the accountSetAssociation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accountSetAssociation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/account-set-associations/{id}")
    public ResponseEntity<AccountSetAssociation> updateAccountSetAssociation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountSetAssociation accountSetAssociation
    ) throws URISyntaxException {
        log.debug("REST request to update AccountSetAssociation : {}, {}", id, accountSetAssociation);
        if (accountSetAssociation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountSetAssociation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountSetAssociationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AccountSetAssociation result = accountSetAssociationRepository.save(accountSetAssociation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountSetAssociation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /account-set-associations/:id} : Partial updates given fields of an existing accountSetAssociation, field will ignore if it is null
     *
     * @param id the id of the accountSetAssociation to save.
     * @param accountSetAssociation the accountSetAssociation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountSetAssociation,
     * or with status {@code 400 (Bad Request)} if the accountSetAssociation is not valid,
     * or with status {@code 404 (Not Found)} if the accountSetAssociation is not found,
     * or with status {@code 500 (Internal Server Error)} if the accountSetAssociation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/account-set-associations/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AccountSetAssociation> partialUpdateAccountSetAssociation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountSetAssociation accountSetAssociation
    ) throws URISyntaxException {
        log.debug("REST request to partial update AccountSetAssociation partially : {}, {}", id, accountSetAssociation);
        if (accountSetAssociation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountSetAssociation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountSetAssociationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AccountSetAssociation> result = accountSetAssociationRepository
            .findById(accountSetAssociation.getId())
            .map(existingAccountSetAssociation -> {
                if (accountSetAssociation.getAccountSetId() != null) {
                    existingAccountSetAssociation.setAccountSetId(accountSetAssociation.getAccountSetId());
                }
                if (accountSetAssociation.getAccountId() != null) {
                    existingAccountSetAssociation.setAccountId(accountSetAssociation.getAccountId());
                }
                if (accountSetAssociation.getStartDate() != null) {
                    existingAccountSetAssociation.setStartDate(accountSetAssociation.getStartDate());
                }
                if (accountSetAssociation.getEndDate() != null) {
                    existingAccountSetAssociation.setEndDate(accountSetAssociation.getEndDate());
                }

                return existingAccountSetAssociation;
            })
            .map(accountSetAssociationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountSetAssociation.getId().toString())
        );
    }

    /**
     * {@code GET  /account-set-associations} : get all the accountSetAssociations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accountSetAssociations in body.
     */
    @GetMapping("/account-set-associations")
    public List<AccountSetAssociation> getAllAccountSetAssociations() {
        log.debug("REST request to get all AccountSetAssociations");
        return accountSetAssociationRepository.findAll();
    }

    /**
     * {@code GET  /account-set-associations/:id} : get the "id" accountSetAssociation.
     *
     * @param id the id of the accountSetAssociation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accountSetAssociation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/account-set-associations/{id}")
    public ResponseEntity<AccountSetAssociation> getAccountSetAssociation(@PathVariable Long id) {
        log.debug("REST request to get AccountSetAssociation : {}", id);
        Optional<AccountSetAssociation> accountSetAssociation = accountSetAssociationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountSetAssociation);
    }

    /**
     * {@code DELETE  /account-set-associations/:id} : delete the "id" accountSetAssociation.
     *
     * @param id the id of the accountSetAssociation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/account-set-associations/{id}")
    public ResponseEntity<Void> deleteAccountSetAssociation(@PathVariable Long id) {
        log.debug("REST request to delete AccountSetAssociation : {}", id);
        accountSetAssociationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
