import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRuleAttributePredicate } from '../rule-attribute-predicate.model';
import { RuleAttributePredicateService } from '../service/rule-attribute-predicate.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './rule-attribute-predicate-delete-dialog.component.html',
})
export class RuleAttributePredicateDeleteDialogComponent {
  ruleAttributePredicate?: IRuleAttributePredicate;

  constructor(protected ruleAttributePredicateService: RuleAttributePredicateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ruleAttributePredicateService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
