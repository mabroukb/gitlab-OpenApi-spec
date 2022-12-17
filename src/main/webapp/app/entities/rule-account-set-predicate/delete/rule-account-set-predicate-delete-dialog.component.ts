import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRuleAccountSetPredicate } from '../rule-account-set-predicate.model';
import { RuleAccountSetPredicateService } from '../service/rule-account-set-predicate.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './rule-account-set-predicate-delete-dialog.component.html',
})
export class RuleAccountSetPredicateDeleteDialogComponent {
  ruleAccountSetPredicate?: IRuleAccountSetPredicate;

  constructor(protected ruleAccountSetPredicateService: RuleAccountSetPredicateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ruleAccountSetPredicateService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
