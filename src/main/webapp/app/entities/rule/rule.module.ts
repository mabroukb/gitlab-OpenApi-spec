import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RuleComponent } from './list/rule.component';
import { RuleDetailComponent } from './detail/rule-detail.component';
import { RuleUpdateComponent } from './update/rule-update.component';
import { RuleDeleteDialogComponent } from './delete/rule-delete-dialog.component';
import { RuleRoutingModule } from './route/rule-routing.module';

@NgModule({
  imports: [SharedModule, RuleRoutingModule],
  declarations: [RuleComponent, RuleDetailComponent, RuleUpdateComponent, RuleDeleteDialogComponent],
})
export class RuleModule {}
