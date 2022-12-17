import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { RuleAccountSetPredicateFormService, RuleAccountSetPredicateFormGroup } from './rule-account-set-predicate-form.service';
import { IRuleAccountSetPredicate } from '../rule-account-set-predicate.model';
import { RuleAccountSetPredicateService } from '../service/rule-account-set-predicate.service';

@Component({
  selector: 'jhi-rule-account-set-predicate-update',
  templateUrl: './rule-account-set-predicate-update.component.html',
})
export class RuleAccountSetPredicateUpdateComponent implements OnInit {
  isSaving = false;
  ruleAccountSetPredicate: IRuleAccountSetPredicate | null = null;

  editForm: RuleAccountSetPredicateFormGroup = this.ruleAccountSetPredicateFormService.createRuleAccountSetPredicateFormGroup();

  constructor(
    protected ruleAccountSetPredicateService: RuleAccountSetPredicateService,
    protected ruleAccountSetPredicateFormService: RuleAccountSetPredicateFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ruleAccountSetPredicate }) => {
      this.ruleAccountSetPredicate = ruleAccountSetPredicate;
      if (ruleAccountSetPredicate) {
        this.updateForm(ruleAccountSetPredicate);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ruleAccountSetPredicate = this.ruleAccountSetPredicateFormService.getRuleAccountSetPredicate(this.editForm);
    if (ruleAccountSetPredicate.id !== null) {
      this.subscribeToSaveResponse(this.ruleAccountSetPredicateService.update(ruleAccountSetPredicate));
    } else {
      this.subscribeToSaveResponse(this.ruleAccountSetPredicateService.create(ruleAccountSetPredicate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRuleAccountSetPredicate>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ruleAccountSetPredicate: IRuleAccountSetPredicate): void {
    this.ruleAccountSetPredicate = ruleAccountSetPredicate;
    this.ruleAccountSetPredicateFormService.resetForm(this.editForm, ruleAccountSetPredicate);
  }
}
