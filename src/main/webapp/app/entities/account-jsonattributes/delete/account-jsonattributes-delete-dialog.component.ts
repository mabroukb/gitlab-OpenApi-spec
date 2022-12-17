import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAccountJsonattributes } from '../account-jsonattributes.model';
import { AccountJsonattributesService } from '../service/account-jsonattributes.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './account-jsonattributes-delete-dialog.component.html',
})
export class AccountJsonattributesDeleteDialogComponent {
  accountJsonattributes?: IAccountJsonattributes;

  constructor(protected accountJsonattributesService: AccountJsonattributesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.accountJsonattributesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
