import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AccountSubjectComponent } from './list/account-subject.component';
import { AccountSubjectDetailComponent } from './detail/account-subject-detail.component';
import { AccountSubjectUpdateComponent } from './update/account-subject-update.component';
import { AccountSubjectDeleteDialogComponent } from './delete/account-subject-delete-dialog.component';
import { AccountSubjectRoutingModule } from './route/account-subject-routing.module';

@NgModule({
  imports: [SharedModule, AccountSubjectRoutingModule],
  declarations: [
    AccountSubjectComponent,
    AccountSubjectDetailComponent,
    AccountSubjectUpdateComponent,
    AccountSubjectDeleteDialogComponent,
  ],
})
export class AccountSubjectModule {}
