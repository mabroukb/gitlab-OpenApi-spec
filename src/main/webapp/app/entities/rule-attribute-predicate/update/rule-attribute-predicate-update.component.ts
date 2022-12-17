import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { RuleAttributePredicateFormService, RuleAttributePredicateFormGroup } from './rule-attribute-predicate-form.service';
import { IRuleAttributePredicate } from '../rule-attribute-predicate.model';
import { RuleAttributePredicateService } from '../service/rule-attribute-predicate.service';

@Component({
  selector: 'jhi-rule-attribute-predicate-update',
  templateUrl: './rule-attribute-predicate-update.component.html',
})
export class RuleAttributePredicateUpdateComponent implements OnInit {
  isSaving = false;
  ruleAttributePredicate: IRuleAttributePredicate | null = null;

  editForm: RuleAttributePredicateFormGroup = this.ruleAttributePredicateFormService.createRuleAttributePredicateFormGroup();

  constructor(
    protected ruleAttributePredicateService: RuleAttributePredicateService,
    protected ruleAttributePredicateFormService: RuleAttributePredicateFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ruleAttributePredicate }) => {
      this.ruleAttributePredicate = ruleAttributePredicate;
      if (ruleAttributePredicate) {
        this.updateForm(ruleAttributePredicate);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ruleAttributePredicate = this.ruleAttributePredicateFormService.getRuleAttributePredicate(this.editForm);
    if (ruleAttributePredicate.id !== null) {
      this.subscribeToSaveResponse(this.ruleAttributePredicateService.update(ruleAttributePredicate));
    } else {
      this.subscribeToSaveResponse(this.ruleAttributePredicateService.create(ruleAttributePredicate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRuleAttributePredicate>>): void {
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

  protected updateForm(ruleAttributePredicate: IRuleAttributePredicate): void {
    this.ruleAttributePredicate = ruleAttributePredicate;
    this.ruleAttributePredicateFormService.resetForm(this.editForm, ruleAttributePredicate);
  }
}
