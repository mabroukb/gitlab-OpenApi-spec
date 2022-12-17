package org.mabroukb.repository;

import org.mabroukb.domain.RuleAccountSetPredicate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RuleAccountSetPredicate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleAccountSetPredicateRepository extends JpaRepository<RuleAccountSetPredicate, Long> {}
