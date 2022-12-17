package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Rule.
 */
@Entity
@Table(name = "rule")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Rule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "rule_id")
    private String ruleId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne
    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(value = { "ruleIds" }, allowSetters = true)
    private PrivilegeSet ruleId;

    @ManyToOne
    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(value = { "ruleIds" }, allowSetters = true)
    private RuleAccountSetPredicate ruleId;

    @ManyToOne
    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(value = { "ruleIds" }, allowSetters = true)
    private RuleAttributePredicate ruleId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Rule id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRuleId() {
        return this.ruleId;
    }

    public Rule ruleId(String ruleId) {
        this.setRuleId(ruleId);
        return this;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public Rule startDate(LocalDate startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public Rule endDate(LocalDate endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public PrivilegeSet getRuleId() {
        return this.ruleId;
    }

    public void setRuleId(PrivilegeSet privilegeSet) {
        this.ruleId = privilegeSet;
    }

    public Rule ruleId(PrivilegeSet privilegeSet) {
        this.setRuleId(privilegeSet);
        return this;
    }

    public RuleAccountSetPredicate getRuleId() {
        return this.ruleId;
    }

    public void setRuleId(RuleAccountSetPredicate ruleAccountSetPredicate) {
        this.ruleId = ruleAccountSetPredicate;
    }

    public Rule ruleId(RuleAccountSetPredicate ruleAccountSetPredicate) {
        this.setRuleId(ruleAccountSetPredicate);
        return this;
    }

    public RuleAttributePredicate getRuleId() {
        return this.ruleId;
    }

    public void setRuleId(RuleAttributePredicate ruleAttributePredicate) {
        this.ruleId = ruleAttributePredicate;
    }

    public Rule ruleId(RuleAttributePredicate ruleAttributePredicate) {
        this.setRuleId(ruleAttributePredicate);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rule)) {
            return false;
        }
        return id != null && id.equals(((Rule) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rule{" +
            "id=" + getId() +
            ", ruleId='" + getRuleId() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
