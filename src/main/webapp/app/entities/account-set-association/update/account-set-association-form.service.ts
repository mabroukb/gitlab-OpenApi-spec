import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountSetAssociation, NewAccountSetAssociation } from '../account-set-association.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountSetAssociation for edit and NewAccountSetAssociationFormGroupInput for create.
 */
type AccountSetAssociationFormGroupInput = IAccountSetAssociation | PartialWithRequiredKeyOf<NewAccountSetAssociation>;

type AccountSetAssociationFormDefaults = Pick<NewAccountSetAssociation, 'id'>;

type AccountSetAssociationFormGroupContent = {
  id: FormControl<IAccountSetAssociation['id'] | NewAccountSetAssociation['id']>;
  accountSetId: FormControl<IAccountSetAssociation['accountSetId']>;
  accountId: FormControl<IAccountSetAssociation['accountId']>;
  startDate: FormControl<IAccountSetAssociation['startDate']>;
  endDate: FormControl<IAccountSetAssociation['endDate']>;
};

export type AccountSetAssociationFormGroup = FormGroup<AccountSetAssociationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountSetAssociationFormService {
  createAccountSetAssociationFormGroup(
    accountSetAssociation: AccountSetAssociationFormGroupInput = { id: null }
  ): AccountSetAssociationFormGroup {
    const accountSetAssociationRawValue = {
      ...this.getFormDefaults(),
      ...accountSetAssociation,
    };
    return new FormGroup<AccountSetAssociationFormGroupContent>({
      id: new FormControl(
        { value: accountSetAssociationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountSetId: new FormControl(accountSetAssociationRawValue.accountSetId),
      accountId: new FormControl(accountSetAssociationRawValue.accountId),
      startDate: new FormControl(accountSetAssociationRawValue.startDate),
      endDate: new FormControl(accountSetAssociationRawValue.endDate),
    });
  }

  getAccountSetAssociation(form: AccountSetAssociationFormGroup): IAccountSetAssociation | NewAccountSetAssociation {
    return form.getRawValue() as IAccountSetAssociation | NewAccountSetAssociation;
  }

  resetForm(form: AccountSetAssociationFormGroup, accountSetAssociation: AccountSetAssociationFormGroupInput): void {
    const accountSetAssociationRawValue = { ...this.getFormDefaults(), ...accountSetAssociation };
    form.reset(
      {
        ...accountSetAssociationRawValue,
        id: { value: accountSetAssociationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountSetAssociationFormDefaults {
    return {
      id: null,
    };
  }
}
