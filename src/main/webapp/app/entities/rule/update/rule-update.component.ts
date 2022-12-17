import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RuleFormService, RuleFormGroup } from './rule-form.service';
import { IRule } from '../rule.model';
import { RuleService } from '../service/rule.service';
import { IPrivilegeSet } from 'app/entities/privilege-set/privilege-set.model';
import { PrivilegeSetService } from 'app/entities/privilege-set/service/privilege-set.service';
import { IRuleAccountSetPredicate } from 'app/entities/rule-account-set-predicate/rule-account-set-predicate.model';
import { RuleAccountSetPredicateService } from 'app/entities/rule-account-set-predicate/service/rule-account-set-predicate.service';
import { IRuleAttributePredicate } from 'app/entities/rule-attribute-predicate/rule-attribute-predicate.model';
import { RuleAttributePredicateService } from 'app/entities/rule-attribute-predicate/service/rule-attribute-predicate.service';

@Component({
  selector: 'jhi-rule-update',
  templateUrl: './rule-update.component.html',
})
export class RuleUpdateComponent implements OnInit {
  isSaving = false;
  rule: IRule | null = null;

  privilegeSetsSharedCollection: IPrivilegeSet[] = [];
  ruleAccountSetPredicatesSharedCollection: IRuleAccountSetPredicate[] = [];
  ruleAttributePredicatesSharedCollection: IRuleAttributePredicate[] = [];

  editForm: RuleFormGroup = this.ruleFormService.createRuleFormGroup();

  constructor(
    protected ruleService: RuleService,
    protected ruleFormService: RuleFormService,
    protected privilegeSetService: PrivilegeSetService,
    protected ruleAccountSetPredicateService: RuleAccountSetPredicateService,
    protected ruleAttributePredicateService: RuleAttributePredicateService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePrivilegeSet = (o1: IPrivilegeSet | null, o2: IPrivilegeSet | null): boolean =>
    this.privilegeSetService.comparePrivilegeSet(o1, o2);

  compareRuleAccountSetPredicate = (o1: IRuleAccountSetPredicate | null, o2: IRuleAccountSetPredicate | null): boolean =>
    this.ruleAccountSetPredicateService.compareRuleAccountSetPredicate(o1, o2);

  compareRuleAttributePredicate = (o1: IRuleAttributePredicate | null, o2: IRuleAttributePredicate | null): boolean =>
    this.ruleAttributePredicateService.compareRuleAttributePredicate(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rule }) => {
      this.rule = rule;
      if (rule) {
        this.updateForm(rule);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rule = this.ruleFormService.getRule(this.editForm);
    if (rule.id !== null) {
      this.subscribeToSaveResponse(this.ruleService.update(rule));
    } else {
      this.subscribeToSaveResponse(this.ruleService.create(rule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRule>>): void {
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

  protected updateForm(rule: IRule): void {
    this.rule = rule;
    this.ruleFormService.resetForm(this.editForm, rule);

    this.privilegeSetsSharedCollection = this.privilegeSetService.addPrivilegeSetToCollectionIfMissing<IPrivilegeSet>(
      this.privilegeSetsSharedCollection,
      rule.ruleId
    );
    this.ruleAccountSetPredicatesSharedCollection =
      this.ruleAccountSetPredicateService.addRuleAccountSetPredicateToCollectionIfMissing<IRuleAccountSetPredicate>(
        this.ruleAccountSetPredicatesSharedCollection,
        rule.ruleId
      );
    this.ruleAttributePredicatesSharedCollection =
      this.ruleAttributePredicateService.addRuleAttributePredicateToCollectionIfMissing<IRuleAttributePredicate>(
        this.ruleAttributePredicatesSharedCollection,
        rule.ruleId
      );
  }

  protected loadRelationshipsOptions(): void {
    this.privilegeSetService
      .query()
      .pipe(map((res: HttpResponse<IPrivilegeSet[]>) => res.body ?? []))
      .pipe(
        map((privilegeSets: IPrivilegeSet[]) =>
          this.privilegeSetService.addPrivilegeSetToCollectionIfMissing<IPrivilegeSet>(privilegeSets, this.rule?.ruleId)
        )
      )
      .subscribe((privilegeSets: IPrivilegeSet[]) => (this.privilegeSetsSharedCollection = privilegeSets));

    this.ruleAccountSetPredicateService
      .query()
      .pipe(map((res: HttpResponse<IRuleAccountSetPredicate[]>) => res.body ?? []))
      .pipe(
        map((ruleAccountSetPredicates: IRuleAccountSetPredicate[]) =>
          this.ruleAccountSetPredicateService.addRuleAccountSetPredicateToCollectionIfMissing<IRuleAccountSetPredicate>(
            ruleAccountSetPredicates,
            this.rule?.ruleId
          )
        )
      )
      .subscribe(
        (ruleAccountSetPredicates: IRuleAccountSetPredicate[]) => (this.ruleAccountSetPredicatesSharedCollection = ruleAccountSetPredicates)
      );

    this.ruleAttributePredicateService
      .query()
      .pipe(map((res: HttpResponse<IRuleAttributePredicate[]>) => res.body ?? []))
      .pipe(
        map((ruleAttributePredicates: IRuleAttributePredicate[]) =>
          this.ruleAttributePredicateService.addRuleAttributePredicateToCollectionIfMissing<IRuleAttributePredicate>(
            ruleAttributePredicates,
            this.rule?.ruleId
          )
        )
      )
      .subscribe(
        (ruleAttributePredicates: IRuleAttributePredicate[]) => (this.ruleAttributePredicatesSharedCollection = ruleAttributePredicates)
      );
  }
}
