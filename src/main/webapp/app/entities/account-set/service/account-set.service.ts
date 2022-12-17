import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAccountSet, NewAccountSet } from '../account-set.model';

export type PartialUpdateAccountSet = Partial<IAccountSet> & Pick<IAccountSet, 'id'>;

export type EntityResponseType = HttpResponse<IAccountSet>;
export type EntityArrayResponseType = HttpResponse<IAccountSet[]>;

@Injectable({ providedIn: 'root' })
export class AccountSetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-sets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountSet: NewAccountSet): Observable<EntityResponseType> {
    return this.http.post<IAccountSet>(this.resourceUrl, accountSet, { observe: 'response' });
  }

  update(accountSet: IAccountSet): Observable<EntityResponseType> {
    return this.http.put<IAccountSet>(`${this.resourceUrl}/${this.getAccountSetIdentifier(accountSet)}`, accountSet, {
      observe: 'response',
    });
  }

  partialUpdate(accountSet: PartialUpdateAccountSet): Observable<EntityResponseType> {
    return this.http.patch<IAccountSet>(`${this.resourceUrl}/${this.getAccountSetIdentifier(accountSet)}`, accountSet, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccountSet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountSet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAccountSetIdentifier(accountSet: Pick<IAccountSet, 'id'>): number {
    return accountSet.id;
  }

  compareAccountSet(o1: Pick<IAccountSet, 'id'> | null, o2: Pick<IAccountSet, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountSetIdentifier(o1) === this.getAccountSetIdentifier(o2) : o1 === o2;
  }

  addAccountSetToCollectionIfMissing<Type extends Pick<IAccountSet, 'id'>>(
    accountSetCollection: Type[],
    ...accountSetsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountSets: Type[] = accountSetsToCheck.filter(isPresent);
    if (accountSets.length > 0) {
      const accountSetCollectionIdentifiers = accountSetCollection.map(accountSetItem => this.getAccountSetIdentifier(accountSetItem)!);
      const accountSetsToAdd = accountSets.filter(accountSetItem => {
        const accountSetIdentifier = this.getAccountSetIdentifier(accountSetItem);
        if (accountSetCollectionIdentifiers.includes(accountSetIdentifier)) {
          return false;
        }
        accountSetCollectionIdentifiers.push(accountSetIdentifier);
        return true;
      });
      return [...accountSetsToAdd, ...accountSetCollection];
    }
    return accountSetCollection;
  }
}
