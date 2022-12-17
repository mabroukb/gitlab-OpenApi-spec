package org.mabroukb.repository;

import org.mabroukb.domain.AccountJsonattributes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AccountJsonattributes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountJsonattributesRepository extends JpaRepository<AccountJsonattributes, Long> {}
