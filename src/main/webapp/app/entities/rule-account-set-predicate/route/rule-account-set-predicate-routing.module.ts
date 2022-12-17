import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RuleAccountSetPredicateComponent } from '../list/rule-account-set-predicate.component';
import { RuleAccountSetPredicateDetailComponent } from '../detail/rule-account-set-predicate-detail.component';
import { RuleAccountSetPredicateUpdateComponent } from '../update/rule-account-set-predicate-update.component';
import { RuleAccountSetPredicateRoutingResolveService } from './rule-account-set-predicate-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ruleAccountSetPredicateRoute: Routes = [
  {
    path: '',
    component: RuleAccountSetPredicateComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RuleAccountSetPredicateDetailComponent,
    resolve: {
      ruleAccountSetPredicate: RuleAccountSetPredicateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RuleAccountSetPredicateUpdateComponent,
    resolve: {
      ruleAccountSetPredicate: RuleAccountSetPredicateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RuleAccountSetPredicateUpdateComponent,
    resolve: {
      ruleAccountSetPredicate: RuleAccountSetPredicateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ruleAccountSetPredicateRoute)],
  exports: [RouterModule],
})
export class RuleAccountSetPredicateRoutingModule {}
