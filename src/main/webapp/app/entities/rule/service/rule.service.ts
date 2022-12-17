import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRule, NewRule } from '../rule.model';

export type PartialUpdateRule = Partial<IRule> & Pick<IRule, 'id'>;

type RestOf<T extends IRule | NewRule> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestRule = RestOf<IRule>;

export type NewRestRule = RestOf<NewRule>;

export type PartialUpdateRestRule = RestOf<PartialUpdateRule>;

export type EntityResponseType = HttpResponse<IRule>;
export type EntityArrayResponseType = HttpResponse<IRule[]>;

@Injectable({ providedIn: 'root' })
export class RuleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rules');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(rule: NewRule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rule);
    return this.http.post<RestRule>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(rule: IRule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rule);
    return this.http
      .put<RestRule>(`${this.resourceUrl}/${this.getRuleIdentifier(rule)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(rule: PartialUpdateRule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rule);
    return this.http
      .patch<RestRule>(`${this.resourceUrl}/${this.getRuleIdentifier(rule)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestRule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRule[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRuleIdentifier(rule: Pick<IRule, 'id'>): number {
    return rule.id;
  }

  compareRule(o1: Pick<IRule, 'id'> | null, o2: Pick<IRule, 'id'> | null): boolean {
    return o1 && o2 ? this.getRuleIdentifier(o1) === this.getRuleIdentifier(o2) : o1 === o2;
  }

  addRuleToCollectionIfMissing<Type extends Pick<IRule, 'id'>>(
    ruleCollection: Type[],
    ...rulesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const rules: Type[] = rulesToCheck.filter(isPresent);
    if (rules.length > 0) {
      const ruleCollectionIdentifiers = ruleCollection.map(ruleItem => this.getRuleIdentifier(ruleItem)!);
      const rulesToAdd = rules.filter(ruleItem => {
        const ruleIdentifier = this.getRuleIdentifier(ruleItem);
        if (ruleCollectionIdentifiers.includes(ruleIdentifier)) {
          return false;
        }
        ruleCollectionIdentifiers.push(ruleIdentifier);
        return true;
      });
      return [...rulesToAdd, ...ruleCollection];
    }
    return ruleCollection;
  }

  protected convertDateFromClient<T extends IRule | NewRule | PartialUpdateRule>(rule: T): RestOf<T> {
    return {
      ...rule,
      startDate: rule.startDate?.format(DATE_FORMAT) ?? null,
      endDate: rule.endDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restRule: RestRule): IRule {
    return {
      ...restRule,
      startDate: restRule.startDate ? dayjs(restRule.startDate) : undefined,
      endDate: restRule.endDate ? dayjs(restRule.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRule>): HttpResponse<IRule> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRule[]>): HttpResponse<IRule[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
