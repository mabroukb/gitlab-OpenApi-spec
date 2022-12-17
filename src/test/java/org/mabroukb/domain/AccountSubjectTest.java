package org.mabroukb.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mabroukb.web.rest.TestUtil;

class AccountSubjectTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountSubject.class);
        AccountSubject accountSubject1 = new AccountSubject();
        accountSubject1.setId(1L);
        AccountSubject accountSubject2 = new AccountSubject();
        accountSubject2.setId(accountSubject1.getId());
        assertThat(accountSubject1).isEqualTo(accountSubject2);
        accountSubject2.setId(2L);
        assertThat(accountSubject1).isNotEqualTo(accountSubject2);
        accountSubject1.setId(null);
        assertThat(accountSubject1).isNotEqualTo(accountSubject2);
    }
}
