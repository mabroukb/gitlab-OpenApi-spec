package org.mabroukb.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mabroukb.web.rest.TestUtil;

class AccountJsonattributesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountJsonattributes.class);
        AccountJsonattributes accountJsonattributes1 = new AccountJsonattributes();
        accountJsonattributes1.setId(1L);
        AccountJsonattributes accountJsonattributes2 = new AccountJsonattributes();
        accountJsonattributes2.setId(accountJsonattributes1.getId());
        assertThat(accountJsonattributes1).isEqualTo(accountJsonattributes2);
        accountJsonattributes2.setId(2L);
        assertThat(accountJsonattributes1).isNotEqualTo(accountJsonattributes2);
        accountJsonattributes1.setId(null);
        assertThat(accountJsonattributes1).isNotEqualTo(accountJsonattributes2);
    }
}
