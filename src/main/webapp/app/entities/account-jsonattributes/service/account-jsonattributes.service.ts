import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAccountJsonattributes, NewAccountJsonattributes } from '../account-jsonattributes.model';

export type PartialUpdateAccountJsonattributes = Partial<IAccountJsonattributes> & Pick<IAccountJsonattributes, 'id'>;

type RestOf<T extends IAccountJsonattributes | NewAccountJsonattributes> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestAccountJsonattributes = RestOf<IAccountJsonattributes>;

export type NewRestAccountJsonattributes = RestOf<NewAccountJsonattributes>;

export type PartialUpdateRestAccountJsonattributes = RestOf<PartialUpdateAccountJsonattributes>;

export type EntityResponseType = HttpResponse<IAccountJsonattributes>;
export type EntityArrayResponseType = HttpResponse<IAccountJsonattributes[]>;

@Injectable({ providedIn: 'root' })
export class AccountJsonattributesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-jsonattributes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountJsonattributes: NewAccountJsonattributes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountJsonattributes);
    return this.http
      .post<RestAccountJsonattributes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(accountJsonattributes: IAccountJsonattributes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountJsonattributes);
    return this.http
      .put<RestAccountJsonattributes>(`${this.resourceUrl}/${this.getAccountJsonattributesIdentifier(accountJsonattributes)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(accountJsonattributes: PartialUpdateAccountJsonattributes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountJsonattributes);
    return this.http
      .patch<RestAccountJsonattributes>(`${this.resourceUrl}/${this.getAccountJsonattributesIdentifier(accountJsonattributes)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAccountJsonattributes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAccountJsonattributes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAccountJsonattributesIdentifier(accountJsonattributes: Pick<IAccountJsonattributes, 'id'>): number {
    return accountJsonattributes.id;
  }

  compareAccountJsonattributes(o1: Pick<IAccountJsonattributes, 'id'> | null, o2: Pick<IAccountJsonattributes, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountJsonattributesIdentifier(o1) === this.getAccountJsonattributesIdentifier(o2) : o1 === o2;
  }

  addAccountJsonattributesToCollectionIfMissing<Type extends Pick<IAccountJsonattributes, 'id'>>(
    accountJsonattributesCollection: Type[],
    ...accountJsonattributesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountJsonattributes: Type[] = accountJsonattributesToCheck.filter(isPresent);
    if (accountJsonattributes.length > 0) {
      const accountJsonattributesCollectionIdentifiers = accountJsonattributesCollection.map(
        accountJsonattributesItem => this.getAccountJsonattributesIdentifier(accountJsonattributesItem)!
      );
      const accountJsonattributesToAdd = accountJsonattributes.filter(accountJsonattributesItem => {
        const accountJsonattributesIdentifier = this.getAccountJsonattributesIdentifier(accountJsonattributesItem);
        if (accountJsonattributesCollectionIdentifiers.includes(accountJsonattributesIdentifier)) {
          return false;
        }
        accountJsonattributesCollectionIdentifiers.push(accountJsonattributesIdentifier);
        return true;
      });
      return [...accountJsonattributesToAdd, ...accountJsonattributesCollection];
    }
    return accountJsonattributesCollection;
  }

  protected convertDateFromClient<T extends IAccountJsonattributes | NewAccountJsonattributes | PartialUpdateAccountJsonattributes>(
    accountJsonattributes: T
  ): RestOf<T> {
    return {
      ...accountJsonattributes,
      startDate: accountJsonattributes.startDate?.format(DATE_FORMAT) ?? null,
      endDate: accountJsonattributes.endDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAccountJsonattributes: RestAccountJsonattributes): IAccountJsonattributes {
    return {
      ...restAccountJsonattributes,
      startDate: restAccountJsonattributes.startDate ? dayjs(restAccountJsonattributes.startDate) : undefined,
      endDate: restAccountJsonattributes.endDate ? dayjs(restAccountJsonattributes.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAccountJsonattributes>): HttpResponse<IAccountJsonattributes> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAccountJsonattributes[]>): HttpResponse<IAccountJsonattributes[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
