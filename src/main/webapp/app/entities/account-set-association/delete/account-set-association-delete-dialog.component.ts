import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAccountSetAssociation } from '../account-set-association.model';
import { AccountSetAssociationService } from '../service/account-set-association.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './account-set-association-delete-dialog.component.html',
})
export class AccountSetAssociationDeleteDialogComponent {
  accountSetAssociation?: IAccountSetAssociation;

  constructor(protected accountSetAssociationService: AccountSetAssociationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.accountSetAssociationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
