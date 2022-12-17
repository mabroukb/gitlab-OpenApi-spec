package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AccountSetAssociation.
 */
@Entity
@Table(name = "account_set_association")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AccountSetAssociation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "account_set_id")
    private String accountSetId;

    @Column(name = "account_id")
    private String accountId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "accountSetId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "accountSetId" }, allowSetters = true)
    private Set<AccountSet> accountSetIds = new HashSet<>();

    @OneToMany(mappedBy = "accountId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "accountId", "accountId" }, allowSetters = true)
    private Set<AccountSubject> accountIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AccountSetAssociation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountSetId() {
        return this.accountSetId;
    }

    public AccountSetAssociation accountSetId(String accountSetId) {
        this.setAccountSetId(accountSetId);
        return this;
    }

    public void setAccountSetId(String accountSetId) {
        this.accountSetId = accountSetId;
    }

    public String getAccountId() {
        return this.accountId;
    }

    public AccountSetAssociation accountId(String accountId) {
        this.setAccountId(accountId);
        return this;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public AccountSetAssociation startDate(LocalDate startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public AccountSetAssociation endDate(LocalDate endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Set<AccountSet> getAccountSetIds() {
        return this.accountSetIds;
    }

    public void setAccountSetIds(Set<AccountSet> accountSets) {
        if (this.accountSetIds != null) {
            this.accountSetIds.forEach(i -> i.setAccountSetId(null));
        }
        if (accountSets != null) {
            accountSets.forEach(i -> i.setAccountSetId(this));
        }
        this.accountSetIds = accountSets;
    }

    public AccountSetAssociation accountSetIds(Set<AccountSet> accountSets) {
        this.setAccountSetIds(accountSets);
        return this;
    }

    public AccountSetAssociation addAccountSetId(AccountSet accountSet) {
        this.accountSetIds.add(accountSet);
        accountSet.setAccountSetId(this);
        return this;
    }

    public AccountSetAssociation removeAccountSetId(AccountSet accountSet) {
        this.accountSetIds.remove(accountSet);
        accountSet.setAccountSetId(null);
        return this;
    }

    public Set<AccountSubject> getAccountIds() {
        return this.accountIds;
    }

    public void setAccountIds(Set<AccountSubject> accountSubjects) {
        if (this.accountIds != null) {
            this.accountIds.forEach(i -> i.setAccountId(null));
        }
        if (accountSubjects != null) {
            accountSubjects.forEach(i -> i.setAccountId(this));
        }
        this.accountIds = accountSubjects;
    }

    public AccountSetAssociation accountIds(Set<AccountSubject> accountSubjects) {
        this.setAccountIds(accountSubjects);
        return this;
    }

    public AccountSetAssociation addAccountId(AccountSubject accountSubject) {
        this.accountIds.add(accountSubject);
        accountSubject.setAccountId(this);
        return this;
    }

    public AccountSetAssociation removeAccountId(AccountSubject accountSubject) {
        this.accountIds.remove(accountSubject);
        accountSubject.setAccountId(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountSetAssociation)) {
            return false;
        }
        return id != null && id.equals(((AccountSetAssociation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountSetAssociation{" +
            "id=" + getId() +
            ", accountSetId='" + getAccountSetId() + "'" +
            ", accountId='" + getAccountId() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
