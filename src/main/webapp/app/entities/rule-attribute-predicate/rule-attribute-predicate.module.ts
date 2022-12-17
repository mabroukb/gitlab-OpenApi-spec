import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RuleAttributePredicateComponent } from './list/rule-attribute-predicate.component';
import { RuleAttributePredicateDetailComponent } from './detail/rule-attribute-predicate-detail.component';
import { RuleAttributePredicateUpdateComponent } from './update/rule-attribute-predicate-update.component';
import { RuleAttributePredicateDeleteDialogComponent } from './delete/rule-attribute-predicate-delete-dialog.component';
import { RuleAttributePredicateRoutingModule } from './route/rule-attribute-predicate-routing.module';

@NgModule({
  imports: [SharedModule, RuleAttributePredicateRoutingModule],
  declarations: [
    RuleAttributePredicateComponent,
    RuleAttributePredicateDetailComponent,
    RuleAttributePredicateUpdateComponent,
    RuleAttributePredicateDeleteDialogComponent,
  ],
})
export class RuleAttributePredicateModule {}
