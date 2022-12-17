import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPrivilegeSet } from '../privilege-set.model';
import { PrivilegeSetService } from '../service/privilege-set.service';

@Injectable({ providedIn: 'root' })
export class PrivilegeSetRoutingResolveService implements Resolve<IPrivilegeSet | null> {
  constructor(protected service: PrivilegeSetService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrivilegeSet | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((privilegeSet: HttpResponse<IPrivilegeSet>) => {
          if (privilegeSet.body) {
            return of(privilegeSet.body);
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
