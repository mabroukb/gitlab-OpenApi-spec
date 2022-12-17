import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PrivilegeSetComponent } from './list/privilege-set.component';
import { PrivilegeSetDetailComponent } from './detail/privilege-set-detail.component';
import { PrivilegeSetUpdateComponent } from './update/privilege-set-update.component';
import { PrivilegeSetDeleteDialogComponent } from './delete/privilege-set-delete-dialog.component';
import { PrivilegeSetRoutingModule } from './route/privilege-set-routing.module';

@NgModule({
  imports: [SharedModule, PrivilegeSetRoutingModule],
  declarations: [PrivilegeSetComponent, PrivilegeSetDetailComponent, PrivilegeSetUpdateComponent, PrivilegeSetDeleteDialogComponent],
})
export class PrivilegeSetModule {}
