package org.mabroukb.repository;

import org.mabroukb.domain.AccountSubject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AccountSubject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountSubjectRepository extends JpaRepository<AccountSubject, Long> {}
