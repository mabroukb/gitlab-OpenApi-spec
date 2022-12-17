package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A RuleAttributePredicate.
 */
@Entity
@Table(name = "rule_attribute_predicate")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RuleAttributePredicate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "rule_attribute_predicate_id")
    private String ruleAttributePredicateId;

    @Column(name = "rule_id")
    private String ruleId;

    @Column(name = "attribute_name")
    private String attributeName;

    @Column(name = "operator")
    private String operator;

    @Column(name = "attribute_values")
    private String attributeValues;

    @OneToMany(mappedBy = "ruleId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ruleId", "ruleId", "ruleId" }, allowSetters = true)
    private Set<Rule> ruleIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RuleAttributePredicate id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRuleAttributePredicateId() {
        return this.ruleAttributePredicateId;
    }

    public RuleAttributePredicate ruleAttributePredicateId(String ruleAttributePredicateId) {
        this.setRuleAttributePredicateId(ruleAttributePredicateId);
        return this;
    }

    public void setRuleAttributePredicateId(String ruleAttributePredicateId) {
        this.ruleAttributePredicateId = ruleAttributePredicateId;
    }

    public String getRuleId() {
        return this.ruleId;
    }

    public RuleAttributePredicate ruleId(String ruleId) {
        this.setRuleId(ruleId);
        return this;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

    public String getAttributeName() {
        return this.attributeName;
    }

    public RuleAttributePredicate attributeName(String attributeName) {
        this.setAttributeName(attributeName);
        return this;
    }

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }

    public String getOperator() {
        return this.operator;
    }

    public RuleAttributePredicate operator(String operator) {
        this.setOperator(operator);
        return this;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getAttributeValues() {
        return this.attributeValues;
    }

    public RuleAttributePredicate attributeValues(String attributeValues) {
        this.setAttributeValues(attributeValues);
        return this;
    }

    public void setAttributeValues(String attributeValues) {
        this.attributeValues = attributeValues;
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

    public RuleAttributePredicate ruleIds(Set<Rule> rules) {
        this.setRuleIds(rules);
        return this;
    }

    public RuleAttributePredicate addRuleId(Rule rule) {
        this.ruleIds.add(rule);
        rule.setRuleId(this);
        return this;
    }

    public RuleAttributePredicate removeRuleId(Rule rule) {
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
        if (!(o instanceof RuleAttributePredicate)) {
            return false;
        }
        return id != null && id.equals(((RuleAttributePredicate) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RuleAttributePredicate{" +
            "id=" + getId() +
            ", ruleAttributePredicateId='" + getRuleAttributePredicateId() + "'" +
            ", ruleId='" + getRuleId() + "'" +
            ", attributeName='" + getAttributeName() + "'" +
            ", operator='" + getOperator() + "'" +
            ", attributeValues='" + getAttributeValues() + "'" +
            "}";
    }
}
