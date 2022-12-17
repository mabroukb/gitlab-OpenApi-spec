package org.mabroukb.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.mabroukb.domain.AccountSubject;
import org.mabroukb.repository.AccountSubjectRepository;
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
 * REST controller for managing {@link org.mabroukb.domain.AccountSubject}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AccountSubjectResource {

    private final Logger log = LoggerFactory.getLogger(AccountSubjectResource.class);

    private static final String ENTITY_NAME = "accountSubject";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccountSubjectRepository accountSubjectRepository;

    public AccountSubjectResource(AccountSubjectRepository accountSubjectRepository) {
        this.accountSubjectRepository = accountSubjectRepository;
    }

    /**
     * {@code POST  /account-subjects} : Create a new accountSubject.
     *
     * @param accountSubject the accountSubject to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accountSubject, or with status {@code 400 (Bad Request)} if the accountSubject has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/account-subjects")
    public ResponseEntity<AccountSubject> createAccountSubject(@RequestBody AccountSubject accountSubject) throws URISyntaxException {
        log.debug("REST request to save AccountSubject : {}", accountSubject);
        if (accountSubject.getId() != null) {
            throw new BadRequestAlertException("A new accountSubject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountSubject result = accountSubjectRepository.save(accountSubject);
        return ResponseEntity
            .created(new URI("/api/account-subjects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /account-subjects/:id} : Updates an existing accountSubject.
     *
     * @param id the id of the accountSubject to save.
     * @param accountSubject the accountSubject to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountSubject,
     * or with status {@code 400 (Bad Request)} if the accountSubject is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accountSubject couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/account-subjects/{id}")
    public ResponseEntity<AccountSubject> updateAccountSubject(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountSubject accountSubject
    ) throws URISyntaxException {
        log.debug("REST request to update AccountSubject : {}, {}", id, accountSubject);
        if (accountSubject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountSubject.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountSubjectRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AccountSubject result = accountSubjectRepository.save(accountSubject);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountSubject.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /account-subjects/:id} : Partial updates given fields of an existing accountSubject, field will ignore if it is null
     *
     * @param id the id of the accountSubject to save.
     * @param accountSubject the accountSubject to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountSubject,
     * or with status {@code 400 (Bad Request)} if the accountSubject is not valid,
     * or with status {@code 404 (Not Found)} if the accountSubject is not found,
     * or with status {@code 500 (Internal Server Error)} if the accountSubject couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/account-subjects/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AccountSubject> partialUpdateAccountSubject(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountSubject accountSubject
    ) throws URISyntaxException {
        log.debug("REST request to partial update AccountSubject partially : {}, {}", id, accountSubject);
        if (accountSubject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountSubject.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountSubjectRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AccountSubject> result = accountSubjectRepository
            .findById(accountSubject.getId())
            .map(existingAccountSubject -> {
                if (accountSubject.getAccountId() != null) {
                    existingAccountSubject.setAccountId(accountSubject.getAccountId());
                }
                if (accountSubject.getPrincipal() != null) {
                    existingAccountSubject.setPrincipal(accountSubject.getPrincipal());
                }

                return existingAccountSubject;
            })
            .map(accountSubjectRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountSubject.getId().toString())
        );
    }

    /**
     * {@code GET  /account-subjects} : get all the accountSubjects.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accountSubjects in body.
     */
    @GetMapping("/account-subjects")
    public ResponseEntity<List<AccountSubject>> getAllAccountSubjects(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of AccountSubjects");
        Page<AccountSubject> page = accountSubjectRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /account-subjects/:id} : get the "id" accountSubject.
     *
     * @param id the id of the accountSubject to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accountSubject, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/account-subjects/{id}")
    public ResponseEntity<AccountSubject> getAccountSubject(@PathVariable Long id) {
        log.debug("REST request to get AccountSubject : {}", id);
        Optional<AccountSubject> accountSubject = accountSubjectRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountSubject);
    }

    /**
     * {@code DELETE  /account-subjects/:id} : delete the "id" accountSubject.
     *
     * @param id the id of the accountSubject to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/account-subjects/{id}")
    public ResponseEntity<Void> deleteAccountSubject(@PathVariable Long id) {
        log.debug("REST request to delete AccountSubject : {}", id);
        accountSubjectRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
