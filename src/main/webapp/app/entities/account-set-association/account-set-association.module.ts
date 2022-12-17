import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AccountSetAssociationComponent } from './list/account-set-association.component';
import { AccountSetAssociationDetailComponent } from './detail/account-set-association-detail.component';
import { AccountSetAssociationUpdateComponent } from './update/account-set-association-update.component';
import { AccountSetAssociationDeleteDialogComponent } from './delete/account-set-association-delete-dialog.component';
import { AccountSetAssociationRoutingModule } from './route/account-set-association-routing.module';

@NgModule({
  imports: [SharedModule, AccountSetAssociationRoutingModule],
  declarations: [
    AccountSetAssociationComponent,
    AccountSetAssociationDetailComponent,
    AccountSetAssociationUpdateComponent,
    AccountSetAssociationDeleteDialogComponent,
  ],
})
export class AccountSetAssociationModule {}
