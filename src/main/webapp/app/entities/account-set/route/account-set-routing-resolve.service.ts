import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountSet } from '../account-set.model';
import { AccountSetService } from '../service/account-set.service';

@Injectable({ providedIn: 'root' })
export class AccountSetRoutingResolveService implements Resolve<IAccountSet | null> {
  constructor(protected service: AccountSetService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountSet | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountSet: HttpResponse<IAccountSet>) => {
          if (accountSet.body) {
            return of(accountSet.body);
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
