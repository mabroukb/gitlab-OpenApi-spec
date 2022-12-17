import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AccountSetAssociationComponent } from '../list/account-set-association.component';
import { AccountSetAssociationDetailComponent } from '../detail/account-set-association-detail.component';
import { AccountSetAssociationUpdateComponent } from '../update/account-set-association-update.component';
import { AccountSetAssociationRoutingResolveService } from './account-set-association-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const accountSetAssociationRoute: Routes = [
  {
    path: '',
    component: AccountSetAssociationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountSetAssociationDetailComponent,
    resolve: {
      accountSetAssociation: AccountSetAssociationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AccountSetAssociationUpdateComponent,
    resolve: {
      accountSetAssociation: AccountSetAssociationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AccountSetAssociationUpdateComponent,
    resolve: {
      accountSetAssociation: AccountSetAssociationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountSetAssociationRoute)],
  exports: [RouterModule],
})
export class AccountSetAssociationRoutingModule {}
