import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRuleAccountSetPredicate, NewRuleAccountSetPredicate } from '../rule-account-set-predicate.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRuleAccountSetPredicate for edit and NewRuleAccountSetPredicateFormGroupInput for create.
 */
type RuleAccountSetPredicateFormGroupInput = IRuleAccountSetPredicate | PartialWithRequiredKeyOf<NewRuleAccountSetPredicate>;

type RuleAccountSetPredicateFormDefaults = Pick<NewRuleAccountSetPredicate, 'id'>;

type RuleAccountSetPredicateFormGroupContent = {
  id: FormControl<IRuleAccountSetPredicate['id'] | NewRuleAccountSetPredicate['id']>;
  ruleAccountSetPredicateId: FormControl<IRuleAccountSetPredicate['ruleAccountSetPredicateId']>;
  ruleId: FormControl<IRuleAccountSetPredicate['ruleId']>;
  accountSetId: FormControl<IRuleAccountSetPredicate['accountSetId']>;
  operator: FormControl<IRuleAccountSetPredicate['operator']>;
  predicateOperand: FormControl<IRuleAccountSetPredicate['predicateOperand']>;
};

export type RuleAccountSetPredicateFormGroup = FormGroup<RuleAccountSetPredicateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RuleAccountSetPredicateFormService {
  createRuleAccountSetPredicateFormGroup(
    ruleAccountSetPredicate: RuleAccountSetPredicateFormGroupInput = { id: null }
  ): RuleAccountSetPredicateFormGroup {
    const ruleAccountSetPredicateRawValue = {
      ...this.getFormDefaults(),
      ...ruleAccountSetPredicate,
    };
    return new FormGroup<RuleAccountSetPredicateFormGroupContent>({
      id: new FormControl(
        { value: ruleAccountSetPredicateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ruleAccountSetPredicateId: new FormControl(ruleAccountSetPredicateRawValue.ruleAccountSetPredicateId),
      ruleId: new FormControl(ruleAccountSetPredicateRawValue.ruleId),
      accountSetId: new FormControl(ruleAccountSetPredicateRawValue.accountSetId),
      operator: new FormControl(ruleAccountSetPredicateRawValue.operator),
      predicateOperand: new FormControl(ruleAccountSetPredicateRawValue.predicateOperand),
    });
  }

  getRuleAccountSetPredicate(form: RuleAccountSetPredicateFormGroup): IRuleAccountSetPredicate | NewRuleAccountSetPredicate {
    return form.getRawValue() as IRuleAccountSetPredicate | NewRuleAccountSetPredicate;
  }

  resetForm(form: RuleAccountSetPredicateFormGroup, ruleAccountSetPredicate: RuleAccountSetPredicateFormGroupInput): void {
    const ruleAccountSetPredicateRawValue = { ...this.getFormDefaults(), ...ruleAccountSetPredicate };
    form.reset(
      {
        ...ruleAccountSetPredicateRawValue,
        id: { value: ruleAccountSetPredicateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RuleAccountSetPredicateFormDefaults {
    return {
      id: null,
    };
  }
}
