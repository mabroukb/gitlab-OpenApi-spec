import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountJsonattributes } from '../account-jsonattributes.model';
import { AccountJsonattributesService } from '../service/account-jsonattributes.service';

@Injectable({ providedIn: 'root' })
export class AccountJsonattributesRoutingResolveService implements Resolve<IAccountJsonattributes | null> {
  constructor(protected service: AccountJsonattributesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountJsonattributes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountJsonattributes: HttpResponse<IAccountJsonattributes>) => {
          if (accountJsonattributes.body) {
            return of(accountJsonattributes.body);
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
