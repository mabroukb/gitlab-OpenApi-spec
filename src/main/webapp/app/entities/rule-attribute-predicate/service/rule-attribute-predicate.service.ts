import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRuleAttributePredicate, NewRuleAttributePredicate } from '../rule-attribute-predicate.model';

export type PartialUpdateRuleAttributePredicate = Partial<IRuleAttributePredicate> & Pick<IRuleAttributePredicate, 'id'>;

export type EntityResponseType = HttpResponse<IRuleAttributePredicate>;
export type EntityArrayResponseType = HttpResponse<IRuleAttributePredicate[]>;

@Injectable({ providedIn: 'root' })
export class RuleAttributePredicateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rule-attribute-predicates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ruleAttributePredicate: NewRuleAttributePredicate): Observable<EntityResponseType> {
    return this.http.post<IRuleAttributePredicate>(this.resourceUrl, ruleAttributePredicate, { observe: 'response' });
  }

  update(ruleAttributePredicate: IRuleAttributePredicate): Observable<EntityResponseType> {
    return this.http.put<IRuleAttributePredicate>(
      `${this.resourceUrl}/${this.getRuleAttributePredicateIdentifier(ruleAttributePredicate)}`,
      ruleAttributePredicate,
      { observe: 'response' }
    );
  }

  partialUpdate(ruleAttributePredicate: PartialUpdateRuleAttributePredicate): Observable<EntityResponseType> {
    return this.http.patch<IRuleAttributePredicate>(
      `${this.resourceUrl}/${this.getRuleAttributePredicateIdentifier(ruleAttributePredicate)}`,
      ruleAttributePredicate,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRuleAttributePredicate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRuleAttributePredicate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRuleAttributePredicateIdentifier(ruleAttributePredicate: Pick<IRuleAttributePredicate, 'id'>): number {
    return ruleAttributePredicate.id;
  }

  compareRuleAttributePredicate(o1: Pick<IRuleAttributePredicate, 'id'> | null, o2: Pick<IRuleAttributePredicate, 'id'> | null): boolean {
    return o1 && o2 ? this.getRuleAttributePredicateIdentifier(o1) === this.getRuleAttributePredicateIdentifier(o2) : o1 === o2;
  }

  addRuleAttributePredicateToCollectionIfMissing<Type extends Pick<IRuleAttributePredicate, 'id'>>(
    ruleAttributePredicateCollection: Type[],
    ...ruleAttributePredicatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ruleAttributePredicates: Type[] = ruleAttributePredicatesToCheck.filter(isPresent);
    if (ruleAttributePredicates.length > 0) {
      const ruleAttributePredicateCollectionIdentifiers = ruleAttributePredicateCollection.map(
        ruleAttributePredicateItem => this.getRuleAttributePredicateIdentifier(ruleAttributePredicateItem)!
      );
      const ruleAttributePredicatesToAdd = ruleAttributePredicates.filter(ruleAttributePredicateItem => {
        const ruleAttributePredicateIdentifier = this.getRuleAttributePredicateIdentifier(ruleAttributePredicateItem);
        if (ruleAttributePredicateCollectionIdentifiers.includes(ruleAttributePredicateIdentifier)) {
          return false;
        }
        ruleAttributePredicateCollectionIdentifiers.push(ruleAttributePredicateIdentifier);
        return true;
      });
      return [...ruleAttributePredicatesToAdd, ...ruleAttributePredicateCollection];
    }
    return ruleAttributePredicateCollection;
  }
}
