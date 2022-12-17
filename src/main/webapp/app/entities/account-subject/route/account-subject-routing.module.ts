import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AccountSubjectComponent } from '../list/account-subject.component';
import { AccountSubjectDetailComponent } from '../detail/account-subject-detail.component';
import { AccountSubjectUpdateComponent } from '../update/account-subject-update.component';
import { AccountSubjectRoutingResolveService } from './account-subject-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const accountSubjectRoute: Routes = [
  {
    path: '',
    component: AccountSubjectComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountSubjectDetailComponent,
    resolve: {
      accountSubject: AccountSubjectRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AccountSubjectUpdateComponent,
    resolve: {
      accountSubject: AccountSubjectRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AccountSubjectUpdateComponent,
    resolve: {
      accountSubject: AccountSubjectRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountSubjectRoute)],
  exports: [RouterModule],
})
export class AccountSubjectRoutingModule {}
