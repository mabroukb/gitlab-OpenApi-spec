package org.mabroukb.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mabroukb.web.rest.TestUtil;

class AccountSetTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountSet.class);
        AccountSet accountSet1 = new AccountSet();
        accountSet1.setId(1L);
        AccountSet accountSet2 = new AccountSet();
        accountSet2.setId(accountSet1.getId());
        assertThat(accountSet1).isEqualTo(accountSet2);
        accountSet2.setId(2L);
        assertThat(accountSet1).isNotEqualTo(accountSet2);
        accountSet1.setId(null);
        assertThat(accountSet1).isNotEqualTo(accountSet2);
    }
}
