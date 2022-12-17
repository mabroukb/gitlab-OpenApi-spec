import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RuleAccountSetPredicateComponent } from './list/rule-account-set-predicate.component';
import { RuleAccountSetPredicateDetailComponent } from './detail/rule-account-set-predicate-detail.component';
import { RuleAccountSetPredicateUpdateComponent } from './update/rule-account-set-predicate-update.component';
import { RuleAccountSetPredicateDeleteDialogComponent } from './delete/rule-account-set-predicate-delete-dialog.component';
import { RuleAccountSetPredicateRoutingModule } from './route/rule-account-set-predicate-routing.module';

@NgModule({
  imports: [SharedModule, RuleAccountSetPredicateRoutingModule],
  declarations: [
    RuleAccountSetPredicateComponent,
    RuleAccountSetPredicateDetailComponent,
    RuleAccountSetPredicateUpdateComponent,
    RuleAccountSetPredicateDeleteDialogComponent,
  ],
})
export class RuleAccountSetPredicateModule {}
