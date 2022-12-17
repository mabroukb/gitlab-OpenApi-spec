import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AccountSetComponent } from '../list/account-set.component';
import { AccountSetDetailComponent } from '../detail/account-set-detail.component';
import { AccountSetUpdateComponent } from '../update/account-set-update.component';
import { AccountSetRoutingResolveService } from './account-set-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const accountSetRoute: Routes = [
  {
    path: '',
    component: AccountSetComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountSetDetailComponent,
    resolve: {
      accountSet: AccountSetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AccountSetUpdateComponent,
    resolve: {
      accountSet: AccountSetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AccountSetUpdateComponent,
    resolve: {
      accountSet: AccountSetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountSetRoute)],
  exports: [RouterModule],
})
export class AccountSetRoutingModule {}
