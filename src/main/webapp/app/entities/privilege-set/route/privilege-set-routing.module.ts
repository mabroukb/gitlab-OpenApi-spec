import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PrivilegeSetComponent } from '../list/privilege-set.component';
import { PrivilegeSetDetailComponent } from '../detail/privilege-set-detail.component';
import { PrivilegeSetUpdateComponent } from '../update/privilege-set-update.component';
import { PrivilegeSetRoutingResolveService } from './privilege-set-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const privilegeSetRoute: Routes = [
  {
    path: '',
    component: PrivilegeSetComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrivilegeSetDetailComponent,
    resolve: {
      privilegeSet: PrivilegeSetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrivilegeSetUpdateComponent,
    resolve: {
      privilegeSet: PrivilegeSetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrivilegeSetUpdateComponent,
    resolve: {
      privilegeSet: PrivilegeSetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(privilegeSetRoute)],
  exports: [RouterModule],
})
export class PrivilegeSetRoutingModule {}
