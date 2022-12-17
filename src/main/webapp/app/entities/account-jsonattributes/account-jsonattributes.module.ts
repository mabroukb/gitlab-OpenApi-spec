import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AccountJsonattributesComponent } from './list/account-jsonattributes.component';
import { AccountJsonattributesDetailComponent } from './detail/account-jsonattributes-detail.component';
import { AccountJsonattributesUpdateComponent } from './update/account-jsonattributes-update.component';
import { AccountJsonattributesDeleteDialogComponent } from './delete/account-jsonattributes-delete-dialog.component';
import { AccountJsonattributesRoutingModule } from './route/account-jsonattributes-routing.module';

@NgModule({
  imports: [SharedModule, AccountJsonattributesRoutingModule],
  declarations: [
    AccountJsonattributesComponent,
    AccountJsonattributesDetailComponent,
    AccountJsonattributesUpdateComponent,
    AccountJsonattributesDeleteDialogComponent,
  ],
})
export class AccountJsonattributesModule {}
