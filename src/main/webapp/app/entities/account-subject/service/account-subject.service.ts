import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAccountSubject, NewAccountSubject } from '../account-subject.model';

export type PartialUpdateAccountSubject = Partial<IAccountSubject> & Pick<IAccountSubject, 'id'>;

export type EntityResponseType = HttpResponse<IAccountSubject>;
export type EntityArrayResponseType = HttpResponse<IAccountSubject[]>;

@Injectable({ providedIn: 'root' })
export class AccountSubjectService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-subjects');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountSubject: NewAccountSubject): Observable<EntityResponseType> {
    return this.http.post<IAccountSubject>(this.resourceUrl, accountSubject, { observe: 'response' });
  }

  update(accountSubject: IAccountSubject): Observable<EntityResponseType> {
    return this.http.put<IAccountSubject>(`${this.resourceUrl}/${this.getAccountSubjectIdentifier(accountSubject)}`, accountSubject, {
      observe: 'response',
    });
  }

  partialUpdate(accountSubject: PartialUpdateAccountSubject): Observable<EntityResponseType> {
    return this.http.patch<IAccountSubject>(`${this.resourceUrl}/${this.getAccountSubjectIdentifier(accountSubject)}`, accountSubject, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccountSubject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountSubject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAccountSubjectIdentifier(accountSubject: Pick<IAccountSubject, 'id'>): number {
    return accountSubject.id;
  }

  compareAccountSubject(o1: Pick<IAccountSubject, 'id'> | null, o2: Pick<IAccountSubject, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountSubjectIdentifier(o1) === this.getAccountSubjectIdentifier(o2) : o1 === o2;
  }

  addAccountSubjectToCollectionIfMissing<Type extends Pick<IAccountSubject, 'id'>>(
    accountSubjectCollection: Type[],
    ...accountSubjectsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountSubjects: Type[] = accountSubjectsToCheck.filter(isPresent);
    if (accountSubjects.length > 0) {
      const accountSubjectCollectionIdentifiers = accountSubjectCollection.map(
        accountSubjectItem => this.getAccountSubjectIdentifier(accountSubjectItem)!
      );
      const accountSubjectsToAdd = accountSubjects.filter(accountSubjectItem => {
        const accountSubjectIdentifier = this.getAccountSubjectIdentifier(accountSubjectItem);
        if (accountSubjectCollectionIdentifiers.includes(accountSubjectIdentifier)) {
          return false;
        }
        accountSubjectCollectionIdentifiers.push(accountSubjectIdentifier);
        return true;
      });
      return [...accountSubjectsToAdd, ...accountSubjectCollection];
    }
    return accountSubjectCollection;
  }
}
