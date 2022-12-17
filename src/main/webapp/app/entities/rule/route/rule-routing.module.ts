import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RuleComponent } from '../list/rule.component';
import { RuleDetailComponent } from '../detail/rule-detail.component';
import { RuleUpdateComponent } from '../update/rule-update.component';
import { RuleRoutingResolveService } from './rule-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ruleRoute: Routes = [
  {
    path: '',
    component: RuleComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RuleDetailComponent,
    resolve: {
      rule: RuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RuleUpdateComponent,
    resolve: {
      rule: RuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RuleUpdateComponent,
    resolve: {
      rule: RuleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ruleRoute)],
  exports: [RouterModule],
})
export class RuleRoutingModule {}
