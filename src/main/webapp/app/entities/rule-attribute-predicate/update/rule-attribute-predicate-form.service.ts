import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRuleAttributePredicate, NewRuleAttributePredicate } from '../rule-attribute-predicate.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRuleAttributePredicate for edit and NewRuleAttributePredicateFormGroupInput for create.
 */
type RuleAttributePredicateFormGroupInput = IRuleAttributePredicate | PartialWithRequiredKeyOf<NewRuleAttributePredicate>;

type RuleAttributePredicateFormDefaults = Pick<NewRuleAttributePredicate, 'id'>;

type RuleAttributePredicateFormGroupContent = {
  id: FormControl<IRuleAttributePredicate['id'] | NewRuleAttributePredicate['id']>;
  ruleAttributePredicateId: FormControl<IRuleAttributePredicate['ruleAttributePredicateId']>;
  ruleId: FormControl<IRuleAttributePredicate['ruleId']>;
  attributeName: FormControl<IRuleAttributePredicate['attributeName']>;
  operator: FormControl<IRuleAttributePredicate['operator']>;
  attributeValues: FormControl<IRuleAttributePredicate['attributeValues']>;
};

export type RuleAttributePredicateFormGroup = FormGroup<RuleAttributePredicateFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RuleAttributePredicateFormService {
  createRuleAttributePredicateFormGroup(
    ruleAttributePredicate: RuleAttributePredicateFormGroupInput = { id: null }
  ): RuleAttributePredicateFormGroup {
    const ruleAttributePredicateRawValue = {
      ...this.getFormDefaults(),
      ...ruleAttributePredicate,
    };
    return new FormGroup<RuleAttributePredicateFormGroupContent>({
      id: new FormControl(
        { value: ruleAttributePredicateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ruleAttributePredicateId: new FormControl(ruleAttributePredicateRawValue.ruleAttributePredicateId),
      ruleId: new FormControl(ruleAttributePredicateRawValue.ruleId),
      attributeName: new FormControl(ruleAttributePredicateRawValue.attributeName),
      operator: new FormControl(ruleAttributePredicateRawValue.operator),
      attributeValues: new FormControl(ruleAttributePredicateRawValue.attributeValues),
    });
  }

  getRuleAttributePredicate(form: RuleAttributePredicateFormGroup): IRuleAttributePredicate | NewRuleAttributePredicate {
    return form.getRawValue() as IRuleAttributePredicate | NewRuleAttributePredicate;
  }

  resetForm(form: RuleAttributePredicateFormGroup, ruleAttributePredicate: RuleAttributePredicateFormGroupInput): void {
    const ruleAttributePredicateRawValue = { ...this.getFormDefaults(), ...ruleAttributePredicate };
    form.reset(
      {
        ...ruleAttributePredicateRawValue,
        id: { value: ruleAttributePredicateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RuleAttributePredicateFormDefaults {
    return {
      id: null,
    };
  }
}
