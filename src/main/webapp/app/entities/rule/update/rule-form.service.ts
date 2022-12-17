import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRule, NewRule } from '../rule.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRule for edit and NewRuleFormGroupInput for create.
 */
type RuleFormGroupInput = IRule | PartialWithRequiredKeyOf<NewRule>;

type RuleFormDefaults = Pick<NewRule, 'id'>;

type RuleFormGroupContent = {
  id: FormControl<IRule['id'] | NewRule['id']>;
  ruleId: FormControl<IRule['ruleId']>;
  startDate: FormControl<IRule['startDate']>;
  endDate: FormControl<IRule['endDate']>;
  ruleId: FormControl<IRule['ruleId']>;
  ruleId: FormControl<IRule['ruleId']>;
  ruleId: FormControl<IRule['ruleId']>;
};

export type RuleFormGroup = FormGroup<RuleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RuleFormService {
  createRuleFormGroup(rule: RuleFormGroupInput = { id: null }): RuleFormGroup {
    const ruleRawValue = {
      ...this.getFormDefaults(),
      ...rule,
    };
    return new FormGroup<RuleFormGroupContent>({
      id: new FormControl(
        { value: ruleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ruleId: new FormControl(ruleRawValue.ruleId),
      startDate: new FormControl(ruleRawValue.startDate),
      endDate: new FormControl(ruleRawValue.endDate),
      ruleId: new FormControl(ruleRawValue.ruleId),
      ruleId: new FormControl(ruleRawValue.ruleId),
      ruleId: new FormControl(ruleRawValue.ruleId),
    });
  }

  getRule(form: RuleFormGroup): IRule | NewRule {
    return form.getRawValue() as IRule | NewRule;
  }

  resetForm(form: RuleFormGroup, rule: RuleFormGroupInput): void {
    const ruleRawValue = { ...this.getFormDefaults(), ...rule };
    form.reset(
      {
        ...ruleRawValue,
        id: { value: ruleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RuleFormDefaults {
    return {
      id: null,
    };
  }
}
