import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRuleAccountSetPredicate } from '../rule-account-set-predicate.model';
import { RuleAccountSetPredicateService } from '../service/rule-account-set-predicate.service';

@Injectable({ providedIn: 'root' })
export class RuleAccountSetPredicateRoutingResolveService implements Resolve<IRuleAccountSetPredicate | null> {
  constructor(protected service: RuleAccountSetPredicateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRuleAccountSetPredicate | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ruleAccountSetPredicate: HttpResponse<IRuleAccountSetPredicate>) => {
          if (ruleAccountSetPredicate.body) {
            return of(ruleAccountSetPredicate.body);
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
