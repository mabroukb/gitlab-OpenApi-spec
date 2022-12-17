import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountSubject } from '../account-subject.model';
import { AccountSubjectService } from '../service/account-subject.service';

@Injectable({ providedIn: 'root' })
export class AccountSubjectRoutingResolveService implements Resolve<IAccountSubject | null> {
  constructor(protected service: AccountSubjectService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountSubject | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountSubject: HttpResponse<IAccountSubject>) => {
          if (accountSubject.body) {
            return of(accountSubject.body);
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
