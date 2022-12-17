import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRuleAttributePredicate } from '../rule-attribute-predicate.model';
import { RuleAttributePredicateService } from '../service/rule-attribute-predicate.service';

@Injectable({ providedIn: 'root' })
export class RuleAttributePredicateRoutingResolveService implements Resolve<IRuleAttributePredicate | null> {
  constructor(protected service: RuleAttributePredicateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRuleAttributePredicate | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ruleAttributePredicate: HttpResponse<IRuleAttributePredicate>) => {
          if (ruleAttributePredicate.body) {
            return of(ruleAttributePredicate.body);
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
