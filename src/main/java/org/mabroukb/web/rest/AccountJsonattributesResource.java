package org.mabroukb.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.mabroukb.domain.AccountJsonattributes;
import org.mabroukb.repository.AccountJsonattributesRepository;
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
 * REST controller for managing {@link org.mabroukb.domain.AccountJsonattributes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AccountJsonattributesResource {

    private final Logger log = LoggerFactory.getLogger(AccountJsonattributesResource.class);

    private static final String ENTITY_NAME = "accountJsonattributes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccountJsonattributesRepository accountJsonattributesRepository;

    public AccountJsonattributesResource(AccountJsonattributesRepository accountJsonattributesRepository) {
        this.accountJsonattributesRepository = accountJsonattributesRepository;
    }

    /**
     * {@code POST  /account-jsonattributes} : Create a new accountJsonattributes.
     *
     * @param accountJsonattributes the accountJsonattributes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accountJsonattributes, or with status {@code 400 (Bad Request)} if the accountJsonattributes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/account-jsonattributes")
    public ResponseEntity<AccountJsonattributes> createAccountJsonattributes(@RequestBody AccountJsonattributes accountJsonattributes)
        throws URISyntaxException {
        log.debug("REST request to save AccountJsonattributes : {}", accountJsonattributes);
        if (accountJsonattributes.getId() != null) {
            throw new BadRequestAlertException("A new accountJsonattributes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountJsonattributes result = accountJsonattributesRepository.save(accountJsonattributes);
        return ResponseEntity
            .created(new URI("/api/account-jsonattributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /account-jsonattributes/:id} : Updates an existing accountJsonattributes.
     *
     * @param id the id of the accountJsonattributes to save.
     * @param accountJsonattributes the accountJsonattributes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountJsonattributes,
     * or with status {@code 400 (Bad Request)} if the accountJsonattributes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accountJsonattributes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/account-jsonattributes/{id}")
    public ResponseEntity<AccountJsonattributes> updateAccountJsonattributes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountJsonattributes accountJsonattributes
    ) throws URISyntaxException {
        log.debug("REST request to update AccountJsonattributes : {}, {}", id, accountJsonattributes);
        if (accountJsonattributes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountJsonattributes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountJsonattributesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AccountJsonattributes result = accountJsonattributesRepository.save(accountJsonattributes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountJsonattributes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /account-jsonattributes/:id} : Partial updates given fields of an existing accountJsonattributes, field will ignore if it is null
     *
     * @param id the id of the accountJsonattributes to save.
     * @param accountJsonattributes the accountJsonattributes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accountJsonattributes,
     * or with status {@code 400 (Bad Request)} if the accountJsonattributes is not valid,
     * or with status {@code 404 (Not Found)} if the accountJsonattributes is not found,
     * or with status {@code 500 (Internal Server Error)} if the accountJsonattributes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/account-jsonattributes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AccountJsonattributes> partialUpdateAccountJsonattributes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AccountJsonattributes accountJsonattributes
    ) throws URISyntaxException {
        log.debug("REST request to partial update AccountJsonattributes partially : {}, {}", id, accountJsonattributes);
        if (accountJsonattributes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, accountJsonattributes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!accountJsonattributesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AccountJsonattributes> result = accountJsonattributesRepository
            .findById(accountJsonattributes.getId())
            .map(existingAccountJsonattributes -> {
                if (accountJsonattributes.getAccountId() != null) {
                    existingAccountJsonattributes.setAccountId(accountJsonattributes.getAccountId());
                }
                if (accountJsonattributes.getJson() != null) {
                    existingAccountJsonattributes.setJson(accountJsonattributes.getJson());
                }
                if (accountJsonattributes.getAccountJsonattributeId() != null) {
                    existingAccountJsonattributes.setAccountJsonattributeId(accountJsonattributes.getAccountJsonattributeId());
                }
                if (accountJsonattributes.getStartDate() != null) {
                    existingAccountJsonattributes.setStartDate(accountJsonattributes.getStartDate());
                }
                if (accountJsonattributes.getEndDate() != null) {
                    existingAccountJsonattributes.setEndDate(accountJsonattributes.getEndDate());
                }

                return existingAccountJsonattributes;
            })
            .map(accountJsonattributesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accountJsonattributes.getId().toString())
        );
    }

    /**
     * {@code GET  /account-jsonattributes} : get all the accountJsonattributes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accountJsonattributes in body.
     */
    @GetMapping("/account-jsonattributes")
    public List<AccountJsonattributes> getAllAccountJsonattributes() {
        log.debug("REST request to get all AccountJsonattributes");
        return accountJsonattributesRepository.findAll();
    }

    /**
     * {@code GET  /account-jsonattributes/:id} : get the "id" accountJsonattributes.
     *
     * @param id the id of the accountJsonattributes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accountJsonattributes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/account-jsonattributes/{id}")
    public ResponseEntity<AccountJsonattributes> getAccountJsonattributes(@PathVariable Long id) {
        log.debug("REST request to get AccountJsonattributes : {}", id);
        Optional<AccountJsonattributes> accountJsonattributes = accountJsonattributesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountJsonattributes);
    }

    /**
     * {@code DELETE  /account-jsonattributes/:id} : delete the "id" accountJsonattributes.
     *
     * @param id the id of the accountJsonattributes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/account-jsonattributes/{id}")
    public ResponseEntity<Void> deleteAccountJsonattributes(@PathVariable Long id) {
        log.debug("REST request to delete AccountJsonattributes : {}", id);
        accountJsonattributesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
