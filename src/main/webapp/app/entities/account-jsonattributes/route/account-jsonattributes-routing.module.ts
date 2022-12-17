import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AccountJsonattributesComponent } from '../list/account-jsonattributes.component';
import { AccountJsonattributesDetailComponent } from '../detail/account-jsonattributes-detail.component';
import { AccountJsonattributesUpdateComponent } from '../update/account-jsonattributes-update.component';
import { AccountJsonattributesRoutingResolveService } from './account-jsonattributes-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const accountJsonattributesRoute: Routes = [
  {
    path: '',
    component: AccountJsonattributesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountJsonattributesDetailComponent,
    resolve: {
      accountJsonattributes: AccountJsonattributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AccountJsonattributesUpdateComponent,
    resolve: {
      accountJsonattributes: AccountJsonattributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AccountJsonattributesUpdateComponent,
    resolve: {
      accountJsonattributes: AccountJsonattributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountJsonattributesRoute)],
  exports: [RouterModule],
})
export class AccountJsonattributesRoutingModule {}
