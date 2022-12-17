import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAccountSetAssociation, NewAccountSetAssociation } from '../account-set-association.model';

export type PartialUpdateAccountSetAssociation = Partial<IAccountSetAssociation> & Pick<IAccountSetAssociation, 'id'>;

type RestOf<T extends IAccountSetAssociation | NewAccountSetAssociation> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestAccountSetAssociation = RestOf<IAccountSetAssociation>;

export type NewRestAccountSetAssociation = RestOf<NewAccountSetAssociation>;

export type PartialUpdateRestAccountSetAssociation = RestOf<PartialUpdateAccountSetAssociation>;

export type EntityResponseType = HttpResponse<IAccountSetAssociation>;
export type EntityArrayResponseType = HttpResponse<IAccountSetAssociation[]>;

@Injectable({ providedIn: 'root' })
export class AccountSetAssociationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-set-associations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountSetAssociation: NewAccountSetAssociation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountSetAssociation);
    return this.http
      .post<RestAccountSetAssociation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(accountSetAssociation: IAccountSetAssociation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountSetAssociation);
    return this.http
      .put<RestAccountSetAssociation>(`${this.resourceUrl}/${this.getAccountSetAssociationIdentifier(accountSetAssociation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(accountSetAssociation: PartialUpdateAccountSetAssociation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountSetAssociation);
    return this.http
      .patch<RestAccountSetAssociation>(`${this.resourceUrl}/${this.getAccountSetAssociationIdentifier(accountSetAssociation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAccountSetAssociation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAccountSetAssociation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAccountSetAssociationIdentifier(accountSetAssociation: Pick<IAccountSetAssociation, 'id'>): number {
    return accountSetAssociation.id;
  }

  compareAccountSetAssociation(o1: Pick<IAccountSetAssociation, 'id'> | null, o2: Pick<IAccountSetAssociation, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountSetAssociationIdentifier(o1) === this.getAccountSetAssociationIdentifier(o2) : o1 === o2;
  }

  addAccountSetAssociationToCollectionIfMissing<Type extends Pick<IAccountSetAssociation, 'id'>>(
    accountSetAssociationCollection: Type[],
    ...accountSetAssociationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountSetAssociations: Type[] = accountSetAssociationsToCheck.filter(isPresent);
    if (accountSetAssociations.length > 0) {
      const accountSetAssociationCollectionIdentifiers = accountSetAssociationCollection.map(
        accountSetAssociationItem => this.getAccountSetAssociationIdentifier(accountSetAssociationItem)!
      );
      const accountSetAssociationsToAdd = accountSetAssociations.filter(accountSetAssociationItem => {
        const accountSetAssociationIdentifier = this.getAccountSetAssociationIdentifier(accountSetAssociationItem);
        if (accountSetAssociationCollectionIdentifiers.includes(accountSetAssociationIdentifier)) {
          return false;
        }
        accountSetAssociationCollectionIdentifiers.push(accountSetAssociationIdentifier);
        return true;
      });
      return [...accountSetAssociationsToAdd, ...accountSetAssociationCollection];
    }
    return accountSetAssociationCollection;
  }

  protected convertDateFromClient<T extends IAccountSetAssociation | NewAccountSetAssociation | PartialUpdateAccountSetAssociation>(
    accountSetAssociation: T
  ): RestOf<T> {
    return {
      ...accountSetAssociation,
      startDate: accountSetAssociation.startDate?.format(DATE_FORMAT) ?? null,
      endDate: accountSetAssociation.endDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAccountSetAssociation: RestAccountSetAssociation): IAccountSetAssociation {
    return {
      ...restAccountSetAssociation,
      startDate: restAccountSetAssociation.startDate ? dayjs(restAccountSetAssociation.startDate) : undefined,
      endDate: restAccountSetAssociation.endDate ? dayjs(restAccountSetAssociation.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAccountSetAssociation>): HttpResponse<IAccountSetAssociation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAccountSetAssociation[]>): HttpResponse<IAccountSetAssociation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
