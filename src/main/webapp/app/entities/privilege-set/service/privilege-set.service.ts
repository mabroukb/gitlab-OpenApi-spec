import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPrivilegeSet, NewPrivilegeSet } from '../privilege-set.model';

export type PartialUpdatePrivilegeSet = Partial<IPrivilegeSet> & Pick<IPrivilegeSet, 'id'>;

export type EntityResponseType = HttpResponse<IPrivilegeSet>;
export type EntityArrayResponseType = HttpResponse<IPrivilegeSet[]>;

@Injectable({ providedIn: 'root' })
export class PrivilegeSetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/privilege-sets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(privilegeSet: NewPrivilegeSet): Observable<EntityResponseType> {
    return this.http.post<IPrivilegeSet>(this.resourceUrl, privilegeSet, { observe: 'response' });
  }

  update(privilegeSet: IPrivilegeSet): Observable<EntityResponseType> {
    return this.http.put<IPrivilegeSet>(`${this.resourceUrl}/${this.getPrivilegeSetIdentifier(privilegeSet)}`, privilegeSet, {
      observe: 'response',
    });
  }

  partialUpdate(privilegeSet: PartialUpdatePrivilegeSet): Observable<EntityResponseType> {
    return this.http.patch<IPrivilegeSet>(`${this.resourceUrl}/${this.getPrivilegeSetIdentifier(privilegeSet)}`, privilegeSet, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrivilegeSet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrivilegeSet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPrivilegeSetIdentifier(privilegeSet: Pick<IPrivilegeSet, 'id'>): number {
    return privilegeSet.id;
  }

  comparePrivilegeSet(o1: Pick<IPrivilegeSet, 'id'> | null, o2: Pick<IPrivilegeSet, 'id'> | null): boolean {
    return o1 && o2 ? this.getPrivilegeSetIdentifier(o1) === this.getPrivilegeSetIdentifier(o2) : o1 === o2;
  }

  addPrivilegeSetToCollectionIfMissing<Type extends Pick<IPrivilegeSet, 'id'>>(
    privilegeSetCollection: Type[],
    ...privilegeSetsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const privilegeSets: Type[] = privilegeSetsToCheck.filter(isPresent);
    if (privilegeSets.length > 0) {
      const privilegeSetCollectionIdentifiers = privilegeSetCollection.map(
        privilegeSetItem => this.getPrivilegeSetIdentifier(privilegeSetItem)!
      );
      const privilegeSetsToAdd = privilegeSets.filter(privilegeSetItem => {
        const privilegeSetIdentifier = this.getPrivilegeSetIdentifier(privilegeSetItem);
        if (privilegeSetCollectionIdentifiers.includes(privilegeSetIdentifier)) {
          return false;
        }
        privilegeSetCollectionIdentifiers.push(privilegeSetIdentifier);
        return true;
      });
      return [...privilegeSetsToAdd, ...privilegeSetCollection];
    }
    return privilegeSetCollection;
  }
}
