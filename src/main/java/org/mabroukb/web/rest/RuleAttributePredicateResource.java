package org.mabroukb.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.mabroukb.domain.RuleAttributePredicate;
import org.mabroukb.repository.RuleAttributePredicateRepository;
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
 * REST controller for managing {@link org.mabroukb.domain.RuleAttributePredicate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RuleAttributePredicateResource {

    private final Logger log = LoggerFactory.getLogger(RuleAttributePredicateResource.class);

    private static final String ENTITY_NAME = "ruleAttributePredicate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RuleAttributePredicateRepository ruleAttributePredicateRepository;

    public RuleAttributePredicateResource(RuleAttributePredicateRepository ruleAttributePredicateRepository) {
        this.ruleAttributePredicateRepository = ruleAttributePredicateRepository;
    }

    /**
     * {@code POST  /rule-attribute-predicates} : Create a new ruleAttributePredicate.
     *
     * @param ruleAttributePredicate the ruleAttributePredicate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ruleAttributePredicate, or with status {@code 400 (Bad Request)} if the ruleAttributePredicate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rule-attribute-predicates")
    public ResponseEntity<RuleAttributePredicate> createRuleAttributePredicate(@RequestBody RuleAttributePredicate ruleAttributePredicate)
        throws URISyntaxException {
        log.debug("REST request to save RuleAttributePredicate : {}", ruleAttributePredicate);
        if (ruleAttributePredicate.getId() != null) {
            throw new BadRequestAlertException("A new ruleAttributePredicate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RuleAttributePredicate result = ruleAttributePredicateRepository.save(ruleAttributePredicate);
        return ResponseEntity
            .created(new URI("/api/rule-attribute-predicates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rule-attribute-predicates/:id} : Updates an existing ruleAttributePredicate.
     *
     * @param id the id of the ruleAttributePredicate to save.
     * @param ruleAttributePredicate the ruleAttributePredicate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ruleAttributePredicate,
     * or with status {@code 400 (Bad Request)} if the ruleAttributePredicate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ruleAttributePredicate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rule-attribute-predicates/{id}")
    public ResponseEntity<RuleAttributePredicate> updateRuleAttributePredicate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RuleAttributePredicate ruleAttributePredicate
    ) throws URISyntaxException {
        log.debug("REST request to update RuleAttributePredicate : {}, {}", id, ruleAttributePredicate);
        if (ruleAttributePredicate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ruleAttributePredicate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ruleAttributePredicateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RuleAttributePredicate result = ruleAttributePredicateRepository.save(ruleAttributePredicate);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ruleAttributePredicate.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rule-attribute-predicates/:id} : Partial updates given fields of an existing ruleAttributePredicate, field will ignore if it is null
     *
     * @param id the id of the ruleAttributePredicate to save.
     * @param ruleAttributePredicate the ruleAttributePredicate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ruleAttributePredicate,
     * or with status {@code 400 (Bad Request)} if the ruleAttributePredicate is not valid,
     * or with status {@code 404 (Not Found)} if the ruleAttributePredicate is not found,
     * or with status {@code 500 (Internal Server Error)} if the ruleAttributePredicate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rule-attribute-predicates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RuleAttributePredicate> partialUpdateRuleAttributePredicate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RuleAttributePredicate ruleAttributePredicate
    ) throws URISyntaxException {
        log.debug("REST request to partial update RuleAttributePredicate partially : {}, {}", id, ruleAttributePredicate);
        if (ruleAttributePredicate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ruleAttributePredicate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ruleAttributePredicateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RuleAttributePredicate> result = ruleAttributePredicateRepository
            .findById(ruleAttributePredicate.getId())
            .map(existingRuleAttributePredicate -> {
                if (ruleAttributePredicate.getRuleAttributePredicateId() != null) {
                    existingRuleAttributePredicate.setRuleAttributePredicateId(ruleAttributePredicate.getRuleAttributePredicateId());
                }
                if (ruleAttributePredicate.getRuleId() != null) {
                    existingRuleAttributePredicate.setRuleId(ruleAttributePredicate.getRuleId());
                }
                if (ruleAttributePredicate.getAttributeName() != null) {
                    existingRuleAttributePredicate.setAttributeName(ruleAttributePredicate.getAttributeName());
                }
                if (ruleAttributePredicate.getOperator() != null) {
                    existingRuleAttributePredicate.setOperator(ruleAttributePredicate.getOperator());
                }
                if (ruleAttributePredicate.getAttributeValues() != null) {
                    existingRuleAttributePredicate.setAttributeValues(ruleAttributePredicate.getAttributeValues());
                }

                return existingRuleAttributePredicate;
            })
            .map(ruleAttributePredicateRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ruleAttributePredicate.getId().toString())
        );
    }

    /**
     * {@code GET  /rule-attribute-predicates} : get all the ruleAttributePredicates.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ruleAttributePredicates in body.
     */
    @GetMapping("/rule-attribute-predicates")
    public ResponseEntity<List<RuleAttributePredicate>> getAllRuleAttributePredicates(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of RuleAttributePredicates");
        Page<RuleAttributePredicate> page = ruleAttributePredicateRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /rule-attribute-predicates/:id} : get the "id" ruleAttributePredicate.
     *
     * @param id the id of the ruleAttributePredicate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ruleAttributePredicate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rule-attribute-predicates/{id}")
    public ResponseEntity<RuleAttributePredicate> getRuleAttributePredicate(@PathVariable Long id) {
        log.debug("REST request to get RuleAttributePredicate : {}", id);
        Optional<RuleAttributePredicate> ruleAttributePredicate = ruleAttributePredicateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ruleAttributePredicate);
    }

    /**
     * {@code DELETE  /rule-attribute-predicates/:id} : delete the "id" ruleAttributePredicate.
     *
     * @param id the id of the ruleAttributePredicate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rule-attribute-predicates/{id}")
    public ResponseEntity<Void> deleteRuleAttributePredicate(@PathVariable Long id) {
        log.debug("REST request to delete RuleAttributePredicate : {}", id);
        ruleAttributePredicateRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
