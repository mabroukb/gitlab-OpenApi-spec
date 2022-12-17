package org.mabroukb.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mabroukb.web.rest.TestUtil;

class AccountSetAssociationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountSetAssociation.class);
        AccountSetAssociation accountSetAssociation1 = new AccountSetAssociation();
        accountSetAssociation1.setId(1L);
        AccountSetAssociation accountSetAssociation2 = new AccountSetAssociation();
        accountSetAssociation2.setId(accountSetAssociation1.getId());
        assertThat(accountSetAssociation1).isEqualTo(accountSetAssociation2);
        accountSetAssociation2.setId(2L);
        assertThat(accountSetAssociation1).isNotEqualTo(accountSetAssociation2);
        accountSetAssociation1.setId(null);
        assertThat(accountSetAssociation1).isNotEqualTo(accountSetAssociation2);
    }
}
