import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRuleAccountSetPredicate, NewRuleAccountSetPredicate } from '../rule-account-set-predicate.model';

export type PartialUpdateRuleAccountSetPredicate = Partial<IRuleAccountSetPredicate> & Pick<IRuleAccountSetPredicate, 'id'>;

export type EntityResponseType = HttpResponse<IRuleAccountSetPredicate>;
export type EntityArrayResponseType = HttpResponse<IRuleAccountSetPredicate[]>;

@Injectable({ providedIn: 'root' })
export class RuleAccountSetPredicateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rule-account-set-predicates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ruleAccountSetPredicate: NewRuleAccountSetPredicate): Observable<EntityResponseType> {
    return this.http.post<IRuleAccountSetPredicate>(this.resourceUrl, ruleAccountSetPredicate, { observe: 'response' });
  }

  update(ruleAccountSetPredicate: IRuleAccountSetPredicate): Observable<EntityResponseType> {
    return this.http.put<IRuleAccountSetPredicate>(
      `${this.resourceUrl}/${this.getRuleAccountSetPredicateIdentifier(ruleAccountSetPredicate)}`,
      ruleAccountSetPredicate,
      { observe: 'response' }
    );
  }

  partialUpdate(ruleAccountSetPredicate: PartialUpdateRuleAccountSetPredicate): Observable<EntityResponseType> {
    return this.http.patch<IRuleAccountSetPredicate>(
      `${this.resourceUrl}/${this.getRuleAccountSetPredicateIdentifier(ruleAccountSetPredicate)}`,
      ruleAccountSetPredicate,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRuleAccountSetPredicate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRuleAccountSetPredicate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRuleAccountSetPredicateIdentifier(ruleAccountSetPredicate: Pick<IRuleAccountSetPredicate, 'id'>): number {
    return ruleAccountSetPredicate.id;
  }

  compareRuleAccountSetPredicate(
    o1: Pick<IRuleAccountSetPredicate, 'id'> | null,
    o2: Pick<IRuleAccountSetPredicate, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getRuleAccountSetPredicateIdentifier(o1) === this.getRuleAccountSetPredicateIdentifier(o2) : o1 === o2;
  }

  addRuleAccountSetPredicateToCollectionIfMissing<Type extends Pick<IRuleAccountSetPredicate, 'id'>>(
    ruleAccountSetPredicateCollection: Type[],
    ...ruleAccountSetPredicatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ruleAccountSetPredicates: Type[] = ruleAccountSetPredicatesToCheck.filter(isPresent);
    if (ruleAccountSetPredicates.length > 0) {
      const ruleAccountSetPredicateCollectionIdentifiers = ruleAccountSetPredicateCollection.map(
        ruleAccountSetPredicateItem => this.getRuleAccountSetPredicateIdentifier(ruleAccountSetPredicateItem)!
      );
      const ruleAccountSetPredicatesToAdd = ruleAccountSetPredicates.filter(ruleAccountSetPredicateItem => {
        const ruleAccountSetPredicateIdentifier = this.getRuleAccountSetPredicateIdentifier(ruleAccountSetPredicateItem);
        if (ruleAccountSetPredicateCollectionIdentifiers.includes(ruleAccountSetPredicateIdentifier)) {
          return false;
        }
        ruleAccountSetPredicateCollectionIdentifiers.push(ruleAccountSetPredicateIdentifier);
        return true;
      });
      return [...ruleAccountSetPredicatesToAdd, ...ruleAccountSetPredicateCollection];
    }
    return ruleAccountSetPredicateCollection;
  }
}
