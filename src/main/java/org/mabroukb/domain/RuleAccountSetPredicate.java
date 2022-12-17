package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A RuleAccountSetPredicate.
 */
@Entity
@Table(name = "rule_account_set_predicate")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RuleAccountSetPredicate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "rule_account_set_predicate_id")
    private String ruleAccountSetPredicateId;

    @Column(name = "rule_id")
    private String ruleId;

    @Column(name = "account_set_id")
    private String accountSetId;

    @Column(name = "operator")
    private String operator;

    @Column(name = "predicate_operand")
    private String predicateOperand;

    @OneToMany(mappedBy = "ruleId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ruleId", "ruleId", "ruleId" }, allowSetters = true)
    private Set<Rule> ruleIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RuleAccountSetPredicate id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRuleAccountSetPredicateId() {
        return this.ruleAccountSetPredicateId;
    }

    public RuleAccountSetPredicate ruleAccountSetPredicateId(String ruleAccountSetPredicateId) {
        this.setRuleAccountSetPredicateId(ruleAccountSetPredicateId);
        return this;
    }

    public void setRuleAccountSetPredicateId(String ruleAccountSetPredicateId) {
        this.ruleAccountSetPredicateId = ruleAccountSetPredicateId;
    }

    public String getRuleId() {
        return this.ruleId;
    }

    public RuleAccountSetPredicate ruleId(String ruleId) {
        this.setRuleId(ruleId);
        return this;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

    public String getAccountSetId() {
        return this.accountSetId;
    }

    public RuleAccountSetPredicate accountSetId(String accountSetId) {
        this.setAccountSetId(accountSetId);
        return this;
    }

    public void setAccountSetId(String accountSetId) {
        this.accountSetId = accountSetId;
    }

    public String getOperator() {
        return this.operator;
    }

    public RuleAccountSetPredicate operator(String operator) {
        this.setOperator(operator);
        return this;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getPredicateOperand() {
        return this.predicateOperand;
    }

    public RuleAccountSetPredicate predicateOperand(String predicateOperand) {
        this.setPredicateOperand(predicateOperand);
        return this;
    }

    public void setPredicateOperand(String predicateOperand) {
        this.predicateOperand = predicateOperand;
    }

    public Set<Rule> getRuleIds() {
        return this.ruleIds;
    }

    public void setRuleIds(Set<Rule> rules) {
        if (this.ruleIds != null) {
            this.ruleIds.forEach(i -> i.setRuleId(null));
        }
        if (rules != null) {
            rules.forEach(i -> i.setRuleId(this));
        }
        this.ruleIds = rules;
    }

    public RuleAccountSetPredicate ruleIds(Set<Rule> rules) {
        this.setRuleIds(rules);
        return this;
    }

    public RuleAccountSetPredicate addRuleId(Rule rule) {
        this.ruleIds.add(rule);
        rule.setRuleId(this);
        return this;
    }

    public RuleAccountSetPredicate removeRuleId(Rule rule) {
        this.ruleIds.remove(rule);
        rule.setRuleId(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RuleAccountSetPredicate)) {
            return false;
        }
        return id != null && id.equals(((RuleAccountSetPredicate) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RuleAccountSetPredicate{" +
            "id=" + getId() +
            ", ruleAccountSetPredicateId='" + getRuleAccountSetPredicateId() + "'" +
            ", ruleId='" + getRuleId() + "'" +
            ", accountSetId='" + getAccountSetId() + "'" +
            ", operator='" + getOperator() + "'" +
            ", predicateOperand='" + getPredicateOperand() + "'" +
            "}";
    }
}
