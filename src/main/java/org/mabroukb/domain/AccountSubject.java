package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AccountSubject.
 */
@Entity
@Table(name = "account_subject")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AccountSubject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "account_id")
    private String accountId;

    @Column(name = "principal")
    private String principal;

    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(value = { "accountSetIds", "accountIds" }, allowSetters = true)
    private AccountSetAssociation accountId;

    @ManyToOne
    @ManyToOne
    @JsonIgnoreProperties(value = { "accountIds" }, allowSetters = true)
    private AccountJsonattributes accountId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AccountSubject id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountId() {
        return this.accountId;
    }

    public AccountSubject accountId(String accountId) {
        this.setAccountId(accountId);
        return this;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getPrincipal() {
        return this.principal;
    }

    public AccountSubject principal(String principal) {
        this.setPrincipal(principal);
        return this;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public AccountSetAssociation getAccountId() {
        return this.accountId;
    }

    public void setAccountId(AccountSetAssociation accountSetAssociation) {
        this.accountId = accountSetAssociation;
    }

    public AccountSubject accountId(AccountSetAssociation accountSetAssociation) {
        this.setAccountId(accountSetAssociation);
        return this;
    }

    public AccountJsonattributes getAccountId() {
        return this.accountId;
    }

    public void setAccountId(AccountJsonattributes accountJsonattributes) {
        this.accountId = accountJsonattributes;
    }

    public AccountSubject accountId(AccountJsonattributes accountJsonattributes) {
        this.setAccountId(accountJsonattributes);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountSubject)) {
            return false;
        }
        return id != null && id.equals(((AccountSubject) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountSubject{" +
            "id=" + getId() +
            ", accountId='" + getAccountId() + "'" +
            ", principal='" + getPrincipal() + "'" +
            "}";
    }
}
