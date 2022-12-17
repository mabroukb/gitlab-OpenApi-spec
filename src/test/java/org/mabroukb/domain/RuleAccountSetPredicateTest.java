package org.mabroukb.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mabroukb.web.rest.TestUtil;

class RuleAccountSetPredicateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RuleAccountSetPredicate.class);
        RuleAccountSetPredicate ruleAccountSetPredicate1 = new RuleAccountSetPredicate();
        ruleAccountSetPredicate1.setId(1L);
        RuleAccountSetPredicate ruleAccountSetPredicate2 = new RuleAccountSetPredicate();
        ruleAccountSetPredicate2.setId(ruleAccountSetPredicate1.getId());
        assertThat(ruleAccountSetPredicate1).isEqualTo(ruleAccountSetPredicate2);
        ruleAccountSetPredicate2.setId(2L);
        assertThat(ruleAccountSetPredicate1).isNotEqualTo(ruleAccountSetPredicate2);
        ruleAccountSetPredicate1.setId(null);
        assertThat(ruleAccountSetPredicate1).isNotEqualTo(ruleAccountSetPredicate2);
    }
}
