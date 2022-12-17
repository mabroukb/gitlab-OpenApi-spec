package org.mabroukb.repository;

import org.mabroukb.domain.AccountSetAssociation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AccountSetAssociation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountSetAssociationRepository extends JpaRepository<AccountSetAssociation, Long> {}
