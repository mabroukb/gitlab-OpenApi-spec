package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A AccountJsonattributes.
 */
@Entity
@Table(name = "account_jsonattributes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AccountJsonattributes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "account_id")
    private String accountId;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "json")
    private String json;

    @Column(name = "account_jsonattribute_id")
    private String accountJsonattributeId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "accountId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "accountId", "accountId" }, allowSetters = true)
    private Set<AccountSubject> accountIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AccountJsonattributes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountId() {
        return this.accountId;
    }

    public AccountJsonattributes accountId(String accountId) {
        this.setAccountId(accountId);
        return this;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getJson() {
        return this.json;
    }

    public AccountJsonattributes json(String json) {
        this.setJson(json);
        return this;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getAccountJsonattributeId() {
        return this.accountJsonattributeId;
    }

    public AccountJsonattributes accountJsonattributeId(String accountJsonattributeId) {
        this.setAccountJsonattributeId(accountJsonattributeId);
        return this;
    }

    public void setAccountJsonattributeId(String accountJsonattributeId) {
        this.accountJsonattributeId = accountJsonattributeId;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public AccountJsonattributes startDate(LocalDate startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public AccountJsonattributes endDate(LocalDate endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
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

    public AccountJsonattributes accountIds(Set<AccountSubject> accountSubjects) {
        this.setAccountIds(accountSubjects);
        return this;
    }

    public AccountJsonattributes addAccountId(AccountSubject accountSubject) {
        this.accountIds.add(accountSubject);
        accountSubject.setAccountId(this);
        return this;
    }

    public AccountJsonattributes removeAccountId(AccountSubject accountSubject) {
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
        if (!(o instanceof AccountJsonattributes)) {
            return false;
        }
        return id != null && id.equals(((AccountJsonattributes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountJsonattributes{" +
            "id=" + getId() +
            ", accountId='" + getAccountId() + "'" +
            ", json='" + getJson() + "'" +
            ", accountJsonattributeId='" + getAccountJsonattributeId() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
