import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAccountSubject } from '../account-subject.model';
import { AccountSubjectService } from '../service/account-subject.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './account-subject-delete-dialog.component.html',
})
export class AccountSubjectDeleteDialogComponent {
  accountSubject?: IAccountSubject;

  constructor(protected accountSubjectService: AccountSubjectService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.accountSubjectService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
