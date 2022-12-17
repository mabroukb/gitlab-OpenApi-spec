import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RuleAttributePredicateComponent } from '../list/rule-attribute-predicate.component';
import { RuleAttributePredicateDetailComponent } from '../detail/rule-attribute-predicate-detail.component';
import { RuleAttributePredicateUpdateComponent } from '../update/rule-attribute-predicate-update.component';
import { RuleAttributePredicateRoutingResolveService } from './rule-attribute-predicate-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ruleAttributePredicateRoute: Routes = [
  {
    path: '',
    component: RuleAttributePredicateComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RuleAttributePredicateDetailComponent,
    resolve: {
      ruleAttributePredicate: RuleAttributePredicateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RuleAttributePredicateUpdateComponent,
    resolve: {
      ruleAttributePredicate: RuleAttributePredicateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RuleAttributePredicateUpdateComponent,
    resolve: {
      ruleAttributePredicate: RuleAttributePredicateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ruleAttributePredicateRoute)],
  exports: [RouterModule],
})
export class RuleAttributePredicateRoutingModule {}
