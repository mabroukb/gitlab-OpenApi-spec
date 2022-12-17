package org.mabroukb.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mabroukb.web.rest.TestUtil;

class RuleAttributePredicateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RuleAttributePredicate.class);
        RuleAttributePredicate ruleAttributePredicate1 = new RuleAttributePredicate();
        ruleAttributePredicate1.setId(1L);
        RuleAttributePredicate ruleAttributePredicate2 = new RuleAttributePredicate();
        ruleAttributePredicate2.setId(ruleAttributePredicate1.getId());
        assertThat(ruleAttributePredicate1).isEqualTo(ruleAttributePredicate2);
        ruleAttributePredicate2.setId(2L);
        assertThat(ruleAttributePredicate1).isNotEqualTo(ruleAttributePredicate2);
        ruleAttributePredicate1.setId(null);
        assertThat(ruleAttributePredicate1).isNotEqualTo(ruleAttributePredicate2);
    }
}
