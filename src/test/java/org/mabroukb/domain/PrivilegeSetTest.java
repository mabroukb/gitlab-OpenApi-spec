package org.mabroukb.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mabroukb.web.rest.TestUtil;

class PrivilegeSetTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrivilegeSet.class);
        PrivilegeSet privilegeSet1 = new PrivilegeSet();
        privilegeSet1.setId(1L);
        PrivilegeSet privilegeSet2 = new PrivilegeSet();
        privilegeSet2.setId(privilegeSet1.getId());
        assertThat(privilegeSet1).isEqualTo(privilegeSet2);
        privilegeSet2.setId(2L);
        assertThat(privilegeSet1).isNotEqualTo(privilegeSet2);
        privilegeSet1.setId(null);
        assertThat(privilegeSet1).isNotEqualTo(privilegeSet2);
    }
}
