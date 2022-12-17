import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRule } from '../rule.model';
import { RuleService } from '../service/rule.service';

@Injectable({ providedIn: 'root' })
export class RuleRoutingResolveService implements Resolve<IRule | null> {
  constructor(protected service: RuleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRule | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((rule: HttpResponse<IRule>) => {
          if (rule.body) {
            return of(rule.body);
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
