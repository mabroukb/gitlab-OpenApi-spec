import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPrivilegeSet, NewPrivilegeSet } from '../privilege-set.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPrivilegeSet for edit and NewPrivilegeSetFormGroupInput for create.
 */
type PrivilegeSetFormGroupInput = IPrivilegeSet | PartialWithRequiredKeyOf<NewPrivilegeSet>;

type PrivilegeSetFormDefaults = Pick<NewPrivilegeSet, 'id'>;

type PrivilegeSetFormGroupContent = {
  id: FormControl<IPrivilegeSet['id'] | NewPrivilegeSet['id']>;
  privilegeSetId: FormControl<IPrivilegeSet['privilegeSetId']>;
  privilege: FormControl<IPrivilegeSet['privilege']>;
  ruleId: FormControl<IPrivilegeSet['ruleId']>;
};

export type PrivilegeSetFormGroup = FormGroup<PrivilegeSetFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PrivilegeSetFormService {
  createPrivilegeSetFormGroup(privilegeSet: PrivilegeSetFormGroupInput = { id: null }): PrivilegeSetFormGroup {
    const privilegeSetRawValue = {
      ...this.getFormDefaults(),
      ...privilegeSet,
    };
    return new FormGroup<PrivilegeSetFormGroupContent>({
      id: new FormControl(
        { value: privilegeSetRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      privilegeSetId: new FormControl(privilegeSetRawValue.privilegeSetId),
      privilege: new FormControl(privilegeSetRawValue.privilege),
      ruleId: new FormControl(privilegeSetRawValue.ruleId),
    });
  }

  getPrivilegeSet(form: PrivilegeSetFormGroup): IPrivilegeSet | NewPrivilegeSet {
    return form.getRawValue() as IPrivilegeSet | NewPrivilegeSet;
  }

  resetForm(form: PrivilegeSetFormGroup, privilegeSet: PrivilegeSetFormGroupInput): void {
    const privilegeSetRawValue = { ...this.getFormDefaults(), ...privilegeSet };
    form.reset(
      {
        ...privilegeSetRawValue,
        id: { value: privilegeSetRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PrivilegeSetFormDefaults {
    return {
      id: null,
    };
  }
}
