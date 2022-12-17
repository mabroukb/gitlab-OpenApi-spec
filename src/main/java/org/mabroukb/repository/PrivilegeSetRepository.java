package org.mabroukb.repository;

import org.mabroukb.domain.PrivilegeSet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PrivilegeSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrivilegeSetRepository extends JpaRepository<PrivilegeSet, Long> {}
