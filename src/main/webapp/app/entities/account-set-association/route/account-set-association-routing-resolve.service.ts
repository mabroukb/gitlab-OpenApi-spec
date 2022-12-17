import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountSetAssociation } from '../account-set-association.model';
import { AccountSetAssociationService } from '../service/account-set-association.service';

@Injectable({ providedIn: 'root' })
export class AccountSetAssociationRoutingResolveService implements Resolve<IAccountSetAssociation | null> {
  constructor(protected service: AccountSetAssociationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountSetAssociation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountSetAssociation: HttpResponse<IAccountSetAssociation>) => {
          if (accountSetAssociation.body) {
            return of(accountSetAssociation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
