import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AccountSetComponent } from './list/account-set.component';
import { AccountSetDetailComponent } from './detail/account-set-detail.component';
import { AccountSetUpdateComponent } from './update/account-set-update.component';
import { AccountSetDeleteDialogComponent } from './delete/account-set-delete-dialog.component';
import { AccountSetRoutingModule } from './route/account-set-routing.module';

@NgModule({
  imports: [SharedModule, AccountSetRoutingModule],
  declarations: [AccountSetComponent, AccountSetDetailComponent, AccountSetUpdateComponent, AccountSetDeleteDialogComponent],
})
export class AccountSetModule {}
