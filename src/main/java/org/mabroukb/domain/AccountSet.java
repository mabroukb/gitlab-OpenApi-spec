package org.mabroukb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AccountSet.
 */
@Entity
@Table(name = "account_set")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AccountSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "account_set_id")
    private String accountSetId;

    @Column(name = "name")
    private String name;

    @Column(name = "super_set_id")
    private String superSetId;

    @Column(name = "path")
    private String path;

    @ManyToOne
    @JsonIgnoreProperties(value = { "accountSetIds", "accountIds" }, allowSetters = true)
    private AccountSetAssociation accountSetId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AccountSet id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountSetId() {
        return this.accountSetId;
    }

    public AccountSet accountSetId(String accountSetId) {
        this.setAccountSetId(accountSetId);
        return this;
    }

    public void setAccountSetId(String accountSetId) {
        this.accountSetId = accountSetId;
    }

    public String getName() {
        return this.name;
    }

    public AccountSet name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSuperSetId() {
        return this.superSetId;
    }

    public AccountSet superSetId(String superSetId) {
        this.setSuperSetId(superSetId);
        return this;
    }

    public void setSuperSetId(String superSetId) {
        this.superSetId = superSetId;
    }

    public String getPath() {
        return this.path;
    }

    public AccountSet path(String path) {
        this.setPath(path);
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public AccountSetAssociation getAccountSetId() {
        return this.accountSetId;
    }

    public void setAccountSetId(AccountSetAssociation accountSetAssociation) {
        this.accountSetId = accountSetAssociation;
    }

    public AccountSet accountSetId(AccountSetAssociation accountSetAssociation) {
        this.setAccountSetId(accountSetAssociation);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountSet)) {
            return false;
        }
        return id != null && id.equals(((AccountSet) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountSet{" +
            "id=" + getId() +
            ", accountSetId='" + getAccountSetId() + "'" +
            ", name='" + getName() + "'" +
            ", superSetId='" + getSuperSetId() + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }
}
