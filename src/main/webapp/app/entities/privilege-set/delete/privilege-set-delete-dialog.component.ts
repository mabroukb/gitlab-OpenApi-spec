import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrivilegeSet } from '../privilege-set.model';
import { PrivilegeSetService } from '../service/privilege-set.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './privilege-set-delete-dialog.component.html',
})
export class PrivilegeSetDeleteDialogComponent {
  privilegeSet?: IPrivilegeSet;

  constructor(protected privilegeSetService: PrivilegeSetService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.privilegeSetService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
