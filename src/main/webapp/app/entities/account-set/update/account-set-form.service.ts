import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountSet, NewAccountSet } from '../account-set.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountSet for edit and NewAccountSetFormGroupInput for create.
 */
type AccountSetFormGroupInput = IAccountSet | PartialWithRequiredKeyOf<NewAccountSet>;

type AccountSetFormDefaults = Pick<NewAccountSet, 'id'>;

type AccountSetFormGroupContent = {
  id: FormControl<IAccountSet['id'] | NewAccountSet['id']>;
  accountSetId: FormControl<IAccountSet['accountSetId']>;
  name: FormControl<IAccountSet['name']>;
  superSetId: FormControl<IAccountSet['superSetId']>;
  path: FormControl<IAccountSet['path']>;
  accountSetId: FormControl<IAccountSet['accountSetId']>;
};

export type AccountSetFormGroup = FormGroup<AccountSetFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountSetFormService {
  createAccountSetFormGroup(accountSet: AccountSetFormGroupInput = { id: null }): AccountSetFormGroup {
    const accountSetRawValue = {
      ...this.getFormDefaults(),
      ...accountSet,
    };
    return new FormGroup<AccountSetFormGroupContent>({
      id: new FormControl(
        { value: accountSetRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountSetId: new FormControl(accountSetRawValue.accountSetId),
      name: new FormControl(accountSetRawValue.name),
      superSetId: new FormControl(accountSetRawValue.superSetId),
      path: new FormControl(accountSetRawValue.path),
      accountSetId: new FormControl(accountSetRawValue.accountSetId),
    });
  }

  getAccountSet(form: AccountSetFormGroup): IAccountSet | NewAccountSet {
    return form.getRawValue() as IAccountSet | NewAccountSet;
  }

  resetForm(form: AccountSetFormGroup, accountSet: AccountSetFormGroupInput): void {
    const accountSetRawValue = { ...this.getFormDefaults(), ...accountSet };
    form.reset(
      {
        ...accountSetRawValue,
        id: { value: accountSetRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountSetFormDefaults {
    return {
      id: null,
    };
  }
}
