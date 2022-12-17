package org.mabroukb.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.mabroukb.domain.PrivilegeSet;
import org.mabroukb.repository.PrivilegeSetRepository;
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
 * REST controller for managing {@link org.mabroukb.domain.PrivilegeSet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrivilegeSetResource {

    private final Logger log = LoggerFactory.getLogger(PrivilegeSetResource.class);

    private static final String ENTITY_NAME = "privilegeSet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrivilegeSetRepository privilegeSetRepository;

    public PrivilegeSetResource(PrivilegeSetRepository privilegeSetRepository) {
        this.privilegeSetRepository = privilegeSetRepository;
    }

    /**
     * {@code POST  /privilege-sets} : Create a new privilegeSet.
     *
     * @param privilegeSet the privilegeSet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new privilegeSet, or with status {@code 400 (Bad Request)} if the privilegeSet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/privilege-sets")
    public ResponseEntity<PrivilegeSet> createPrivilegeSet(@RequestBody PrivilegeSet privilegeSet) throws URISyntaxException {
        log.debug("REST request to save PrivilegeSet : {}", privilegeSet);
        if (privilegeSet.getId() != null) {
            throw new BadRequestAlertException("A new privilegeSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrivilegeSet result = privilegeSetRepository.save(privilegeSet);
        return ResponseEntity
            .created(new URI("/api/privilege-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /privilege-sets/:id} : Updates an existing privilegeSet.
     *
     * @param id the id of the privilegeSet to save.
     * @param privilegeSet the privilegeSet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated privilegeSet,
     * or with status {@code 400 (Bad Request)} if the privilegeSet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the privilegeSet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/privilege-sets/{id}")
    public ResponseEntity<PrivilegeSet> updatePrivilegeSet(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PrivilegeSet privilegeSet
    ) throws URISyntaxException {
        log.debug("REST request to update PrivilegeSet : {}, {}", id, privilegeSet);
        if (privilegeSet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, privilegeSet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!privilegeSetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PrivilegeSet result = privilegeSetRepository.save(privilegeSet);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, privilegeSet.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /privilege-sets/:id} : Partial updates given fields of an existing privilegeSet, field will ignore if it is null
     *
     * @param id the id of the privilegeSet to save.
     * @param privilegeSet the privilegeSet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated privilegeSet,
     * or with status {@code 400 (Bad Request)} if the privilegeSet is not valid,
     * or with status {@code 404 (Not Found)} if the privilegeSet is not found,
     * or with status {@code 500 (Internal Server Error)} if the privilegeSet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/privilege-sets/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PrivilegeSet> partialUpdatePrivilegeSet(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PrivilegeSet privilegeSet
    ) throws URISyntaxException {
        log.debug("REST request to partial update PrivilegeSet partially : {}, {}", id, privilegeSet);
        if (privilegeSet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, privilegeSet.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!privilegeSetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PrivilegeSet> result = privilegeSetRepository
            .findById(privilegeSet.getId())
            .map(existingPrivilegeSet -> {
                if (privilegeSet.getPrivilegeSetId() != null) {
                    existingPrivilegeSet.setPrivilegeSetId(privilegeSet.getPrivilegeSetId());
                }
                if (privilegeSet.getPrivilege() != null) {
                    existingPrivilegeSet.setPrivilege(privilegeSet.getPrivilege());
                }
                if (privilegeSet.getRuleId() != null) {
                    existingPrivilegeSet.setRuleId(privilegeSet.getRuleId());
                }

                return existingPrivilegeSet;
            })
            .map(privilegeSetRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, privilegeSet.getId().toString())
        );
    }

    /**
     * {@code GET  /privilege-sets} : get all the privilegeSets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of privilegeSets in body.
     */
    @GetMapping("/privilege-sets")
    public List<PrivilegeSet> getAllPrivilegeSets() {
        log.debug("REST request to get all PrivilegeSets");
        return privilegeSetRepository.findAll();
    }

    /**
     * {@code GET  /privilege-sets/:id} : get the "id" privilegeSet.
     *
     * @param id the id of the privilegeSet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the privilegeSet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/privilege-sets/{id}")
    public ResponseEntity<PrivilegeSet> getPrivilegeSet(@PathVariable Long id) {
        log.debug("REST request to get PrivilegeSet : {}", id);
        Optional<PrivilegeSet> privilegeSet = privilegeSetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(privilegeSet);
    }

    /**
     * {@code DELETE  /privilege-sets/:id} : delete the "id" privilegeSet.
     *
     * @param id the id of the privilegeSet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/privilege-sets/{id}")
    public ResponseEntity<Void> deletePrivilegeSet(@PathVariable Long id) {
        log.debug("REST request to delete PrivilegeSet : {}", id);
        privilegeSetRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
