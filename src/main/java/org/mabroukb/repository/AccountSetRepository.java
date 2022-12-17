package org.mabroukb.repository;

import org.mabroukb.domain.AccountSet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AccountSet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountSetRepository extends JpaRepository<AccountSet, Long> {}
