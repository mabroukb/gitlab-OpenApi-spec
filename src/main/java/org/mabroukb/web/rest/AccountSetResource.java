package org.mabroukb.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.mabroukb.domain.AccountSet;
import org.mabroukb.repository.AccountSetRepository;
import org.mabroukb.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.mabroukb.domain.AccountSet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AccountSetResource {

    private final Logger log = LoggerFactory.getLogger(AccountSetResource.class);

    private static final String ENTITY_NAME = "accountSet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccountSetRepository accountSetRepository;

    public AccountSetResource(AccountSetRepository accountSetRepository) {
        this.accountSetRepository = accountSetRepository;
    }

    /**
     * {@code POST  /account-sets} : Create a new accountSet.
     *
     * @param accountSet the accountSet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accountSet, or with status {@code 400 (Bad Request)} if the accountSet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/account-sets")
    public ResponseEntity<AccountSet> createAccountSet(@RequestBody AccountSet accountSet) throws URISyntaxException {
        log.debug("REST request to save AccountSet : {}", accountSet);
        if (accountSet.getId() != null) {
            throw new BadRequestAlertException("A new accountSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountSet result = accountSetRepository.save(accountSet);
        return ResponseEntity
            .created(new URI("/api/account-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /account-sets/:id} : Updates an existing accountSet.
     *
     * @param id the id of the accountSet to save.
     * @param accountSet the accountSet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountSet,
     * or with status {@code 400 (Bad Request)} if the accountSet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accountSet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/account-sets/{id}")
    public ResponseEntity<AccountSet> updateAccountSet(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountSet accountSet
    ) throws URISyntaxException {
        log.debug("REST request to update AccountSet : {}, {}", id, accountSet);
        if (accountSet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountSet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountSetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AccountSet result = accountSetRepository.save(accountSet);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountSet.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /account-sets/:id} : Partial updates given fields of an existing accountSet, field will ignore if it is null
     *
     * @param id the id of the accountSet to save.
     * @param accountSet the accountSet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountSet,
     * or with status {@code 400 (Bad Request)} if the accountSet is not valid,
     * or with status {@code 404 (Not Found)} if the accountSet is not found,
     * or with status {@code 500 (Internal Server Error)} if the accountSet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/account-sets/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AccountSet> partialUpdateAccountSet(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountSet accountSet
    ) throws URISyntaxException {
        log.debug("REST request to partial update AccountSet partially : {}, {}", id, accountSet);
        if (accountSet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountSet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountSetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AccountSet> result = accountSetRepository
            .findById(accountSet.getId())
            .map(existingAccountSet -> {
                if (accountSet.getAccountSetId() != null) {
                    existingAccountSet.setAccountSetId(accountSet.getAccountSetId());
                }
                if (accountSet.getName() != null) {
                    existingAccountSet.setName(accountSet.getName());
                }
                if (accountSet.getSuperSetId() != null) {
                    existingAccountSet.setSuperSetId(accountSet.getSuperSetId());
                }
                if (accountSet.getPath() != null) {
                    existingAccountSet.setPath(accountSet.getPath());
                }

                return existingAccountSet;
            })
            .map(accountSetRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountSet.getId().toString())
        );
    }

    /**
     * {@code GET  /account-sets} : get all the accountSets.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accountSets in body.
     */
    @GetMapping("/account-sets")
    public ResponseEntity<List<AccountSet>> getAllAccountSets(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of AccountSets");
        Page<AccountSet> page = accountSetRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /account-sets/:id} : get the "id" accountSet.
     *
     * @param id the id of the accountSet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accountSet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/account-sets/{id}")
    public ResponseEntity<AccountSet> getAccountSet(@PathVariable Long id) {
        log.debug("REST request to get AccountSet : {}", id);
        Optional<AccountSet> accountSet = accountSetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountSet);
    }

    /**
     * {@code DELETE  /account-sets/:id} : delete the "id" accountSet.
     *
     * @param id the id of the accountSet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/account-sets/{id}")
    public ResponseEntity<Void> deleteAccountSet(@PathVariable Long id) {
        log.debug("REST request to delete AccountSet : {}", id);
        accountSetRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
