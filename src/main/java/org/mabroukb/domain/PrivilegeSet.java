package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PrivilegeSet.
 */
@Entity
@Table(name = "privilege_set")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PrivilegeSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "privilege_set_id")
    private String privilegeSetId;

    @Column(name = "privilege")
    private String privilege;

    @Column(name = "rule_id")
    private String ruleId;

    @OneToMany(mappedBy = "ruleId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ruleId", "ruleId", "ruleId" }, allowSetters = true)
    private Set<Rule> ruleIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PrivilegeSet id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrivilegeSetId() {
        return this.privilegeSetId;
    }

    public PrivilegeSet privilegeSetId(String privilegeSetId) {
        this.setPrivilegeSetId(privilegeSetId);
        return this;
    }

    public void setPrivilegeSetId(String privilegeSetId) {
        this.privilegeSetId = privilegeSetId;
    }

    public String getPrivilege() {
        return this.privilege;
    }

    public PrivilegeSet privilege(String privilege) {
        this.setPrivilege(privilege);
        return this;
    }

    public void setPrivilege(String privilege) {
        this.privilege = privilege;
    }

    public String getRuleId() {
        return this.ruleId;
    }

    public PrivilegeSet ruleId(String ruleId) {
        this.setRuleId(ruleId);
        return this;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
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

    public PrivilegeSet ruleIds(Set<Rule> rules) {
        this.setRuleIds(rules);
        return this;
    }

    public PrivilegeSet addRuleId(Rule rule) {
        this.ruleIds.add(rule);
        rule.setRuleId(this);
        return this;
    }

    public PrivilegeSet removeRuleId(Rule rule) {
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
        if (!(o instanceof PrivilegeSet)) {
            return false;
        }
        return id != null && id.equals(((PrivilegeSet) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PrivilegeSet{" +
            "id=" + getId() +
            ", privilegeSetId='" + getPrivilegeSetId() + "'" +
            ", privilege='" + getPrivilege() + "'" +
            ", ruleId='" + getRuleId() + "'" +
            "}";
    }
}
