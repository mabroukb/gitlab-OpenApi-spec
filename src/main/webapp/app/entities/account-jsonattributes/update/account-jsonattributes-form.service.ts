import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountJsonattributes, NewAccountJsonattributes } from '../account-jsonattributes.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountJsonattributes for edit and NewAccountJsonattributesFormGroupInput for create.
 */
type AccountJsonattributesFormGroupInput = IAccountJsonattributes | PartialWithRequiredKeyOf<NewAccountJsonattributes>;

type AccountJsonattributesFormDefaults = Pick<NewAccountJsonattributes, 'id'>;

type AccountJsonattributesFormGroupContent = {
  id: FormControl<IAccountJsonattributes['id'] | NewAccountJsonattributes['id']>;
  accountId: FormControl<IAccountJsonattributes['accountId']>;
  json: FormControl<IAccountJsonattributes['json']>;
  accountJsonattributeId: FormControl<IAccountJsonattributes['accountJsonattributeId']>;
  startDate: FormControl<IAccountJsonattributes['startDate']>;
  endDate: FormControl<IAccountJsonattributes['endDate']>;
};

export type AccountJsonattributesFormGroup = FormGroup<AccountJsonattributesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountJsonattributesFormService {
  createAccountJsonattributesFormGroup(
    accountJsonattributes: AccountJsonattributesFormGroupInput = { id: null }
  ): AccountJsonattributesFormGroup {
    const accountJsonattributesRawValue = {
      ...this.getFormDefaults(),
      ...accountJsonattributes,
    };
    return new FormGroup<AccountJsonattributesFormGroupContent>({
      id: new FormControl(
        { value: accountJsonattributesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountId: new FormControl(accountJsonattributesRawValue.accountId),
      json: new FormControl(accountJsonattributesRawValue.json),
      accountJsonattributeId: new FormControl(accountJsonattributesRawValue.accountJsonattributeId),
      startDate: new FormControl(accountJsonattributesRawValue.startDate),
      endDate: new FormControl(accountJsonattributesRawValue.endDate),
    });
  }

  getAccountJsonattributes(form: AccountJsonattributesFormGroup): IAccountJsonattributes | NewAccountJsonattributes {
    return form.getRawValue() as IAccountJsonattributes | NewAccountJsonattributes;
  }

  resetForm(form: AccountJsonattributesFormGroup, accountJsonattributes: AccountJsonattributesFormGroupInput): void {
    const accountJsonattributesRawValue = { ...this.getFormDefaults(), ...accountJsonattributes };
    form.reset(
      {
        ...accountJsonattributesRawValue,
        id: { value: accountJsonattributesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountJsonattributesFormDefaults {
    return {
      id: null,
    };
  }
}
