package org.mabroukb.repository;

import org.mabroukb.domain.RuleAttributePredicate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RuleAttributePredicate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleAttributePredicateRepository extends JpaRepository<RuleAttributePredicate, Long> {}
