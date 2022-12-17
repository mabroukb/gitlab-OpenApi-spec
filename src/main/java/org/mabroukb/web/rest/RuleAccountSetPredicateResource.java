package org.mabroukb.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.mabroukb.domain.RuleAccountSetPredicate;
import org.mabroukb.repository.RuleAccountSetPredicateRepository;
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
 * REST controller for managing {@link org.mabroukb.domain.RuleAccountSetPredicate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RuleAccountSetPredicateResource {

    private final Logger log = LoggerFactory.getLogger(RuleAccountSetPredicateResource.class);

    private static final String ENTITY_NAME = "ruleAccountSetPredicate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RuleAccountSetPredicateRepository ruleAccountSetPredicateRepository;

    public RuleAccountSetPredicateResource(RuleAccountSetPredicateRepository ruleAccountSetPredicateRepository) {
        this.ruleAccountSetPredicateRepository = ruleAccountSetPredicateRepository;
    }

    /**
     * {@code POST  /rule-account-set-predicates} : Create a new ruleAccountSetPredicate.
     *
     * @param ruleAccountSetPredicate the ruleAccountSetPredicate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ruleAccountSetPredicate, or with status {@code 400 (Bad Request)} if the ruleAccountSetPredicate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rule-account-set-predicates")
    public ResponseEntity<RuleAccountSetPredicate> createRuleAccountSetPredicate(
        @RequestBody RuleAccountSetPredicate ruleAccountSetPredicate
    ) throws URISyntaxException {
        log.debug("REST request to save RuleAccountSetPredicate : {}", ruleAccountSetPredicate);
        if (ruleAccountSetPredicate.getId() != null) {
            throw new BadRequestAlertException("A new ruleAccountSetPredicate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RuleAccountSetPredicate result = ruleAccountSetPredicateRepository.save(ruleAccountSetPredicate);
        return ResponseEntity
            .created(new URI("/api/rule-account-set-predicates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rule-account-set-predicates/:id} : Updates an existing ruleAccountSetPredicate.
     *
     * @param id the id of the ruleAccountSetPredicate to save.
     * @param ruleAccountSetPredicate the ruleAccountSetPredicate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ruleAccountSetPredicate,
     * or with status {@code 400 (Bad Request)} if the ruleAccountSetPredicate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ruleAccountSetPredicate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rule-account-set-predicates/{id}")
    public ResponseEntity<RuleAccountSetPredicate> updateRuleAccountSetPredicate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RuleAccountSetPredicate ruleAccountSetPredicate
    ) throws URISyntaxException {
        log.debug("REST request to update RuleAccountSetPredicate : {}, {}", id, ruleAccountSetPredicate);
        if (ruleAccountSetPredicate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ruleAccountSetPredicate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ruleAccountSetPredicateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RuleAccountSetPredicate result = ruleAccountSetPredicateRepository.save(ruleAccountSetPredicate);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ruleAccountSetPredicate.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rule-account-set-predicates/:id} : Partial updates given fields of an existing ruleAccountSetPredicate, field will ignore if it is null
     *
     * @param id the id of the ruleAccountSetPredicate to save.
     * @param ruleAccountSetPredicate the ruleAccountSetPredicate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ruleAccountSetPredicate,
     * or with status {@code 400 (Bad Request)} if the ruleAccountSetPredicate is not valid,
     * or with status {@code 404 (Not Found)} if the ruleAccountSetPredicate is not found,
     * or with status {@code 500 (Internal Server Error)} if the ruleAccountSetPredicate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rule-account-set-predicates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RuleAccountSetPredicate> partialUpdateRuleAccountSetPredicate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RuleAccountSetPredicate ruleAccountSetPredicate
    ) throws URISyntaxException {
        log.debug("REST request to partial update RuleAccountSetPredicate partially : {}, {}", id, ruleAccountSetPredicate);
        if (ruleAccountSetPredicate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ruleAccountSetPredicate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ruleAccountSetPredicateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RuleAccountSetPredicate> result = ruleAccountSetPredicateRepository
            .findById(ruleAccountSetPredicate.getId())
            .map(existingRuleAccountSetPredicate -> {
                if (ruleAccountSetPredicate.getRuleAccountSetPredicateId() != null) {
                    existingRuleAccountSetPredicate.setRuleAccountSetPredicateId(ruleAccountSetPredicate.getRuleAccountSetPredicateId());
                }
                if (ruleAccountSetPredicate.getRuleId() != null) {
                    existingRuleAccountSetPredicate.setRuleId(ruleAccountSetPredicate.getRuleId());
                }
                if (ruleAccountSetPredicate.getAccountSetId() != null) {
                    existingRuleAccountSetPredicate.setAccountSetId(ruleAccountSetPredicate.getAccountSetId());
                }
                if (ruleAccountSetPredicate.getOperator() != null) {
                    existingRuleAccountSetPredicate.setOperator(ruleAccountSetPredicate.getOperator());
                }
                if (ruleAccountSetPredicate.getPredicateOperand() != null) {
                    existingRuleAccountSetPredicate.setPredicateOperand(ruleAccountSetPredicate.getPredicateOperand());
                }

                return existingRuleAccountSetPredicate;
            })
            .map(ruleAccountSetPredicateRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ruleAccountSetPredicate.getId().toString())
        );
    }

    /**
     * {@code GET  /rule-account-set-predicates} : get all the ruleAccountSetPredicates.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ruleAccountSetPredicates in body.
     */
    @GetMapping("/rule-account-set-predicates")
    public ResponseEntity<List<RuleAccountSetPredicate>> getAllRuleAccountSetPredicates(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of RuleAccountSetPredicates");
        Page<RuleAccountSetPredicate> page = ruleAccountSetPredicateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /rule-account-set-predicates/:id} : get the "id" ruleAccountSetPredicate.
     *
     * @param id the id of the ruleAccountSetPredicate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ruleAccountSetPredicate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rule-account-set-predicates/{id}")
    public ResponseEntity<RuleAccountSetPredicate> getRuleAccountSetPredicate(@PathVariable Long id) {
        log.debug("REST request to get RuleAccountSetPredicate : {}", id);
        Optional<RuleAccountSetPredicate> ruleAccountSetPredicate = ruleAccountSetPredicateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ruleAccountSetPredicate);
    }

    /**
     * {@code DELETE  /rule-account-set-predicates/:id} : delete the "id" ruleAccountSetPredicate.
     *
     * @param id the id of the ruleAccountSetPredicate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rule-account-set-predicates/{id}")
    public ResponseEntity<Void> deleteRuleAccountSetPredicate(@PathVariable Long id) {
        log.debug("REST request to delete RuleAccountSetPredicate : {}", id);
        ruleAccountSetPredicateRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
