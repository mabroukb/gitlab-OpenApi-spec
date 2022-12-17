import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountSubject, NewAccountSubject } from '../account-subject.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountSubject for edit and NewAccountSubjectFormGroupInput for create.
 */
type AccountSubjectFormGroupInput = IAccountSubject | PartialWithRequiredKeyOf<NewAccountSubject>;

type AccountSubjectFormDefaults = Pick<NewAccountSubject, 'id'>;

type AccountSubjectFormGroupContent = {
  id: FormControl<IAccountSubject['id'] | NewAccountSubject['id']>;
  accountId: FormControl<IAccountSubject['accountId']>;
  principal: FormControl<IAccountSubject['principal']>;
  accountId: FormControl<IAccountSubject['accountId']>;
  accountId: FormControl<IAccountSubject['accountId']>;
};

export type AccountSubjectFormGroup = FormGroup<AccountSubjectFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountSubjectFormService {
  createAccountSubjectFormGroup(accountSubject: AccountSubjectFormGroupInput = { id: null }): AccountSubjectFormGroup {
    const accountSubjectRawValue = {
      ...this.getFormDefaults(),
      ...accountSubject,
    };
    return new FormGroup<AccountSubjectFormGroupContent>({
      id: new FormControl(
        { value: accountSubjectRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountId: new FormControl(accountSubjectRawValue.accountId),
      principal: new FormControl(accountSubjectRawValue.principal),
      accountId: new FormControl(accountSubjectRawValue.accountId),
      accountId: new FormControl(accountSubjectRawValue.accountId),
    });
  }

  getAccountSubject(form: AccountSubjectFormGroup): IAccountSubject | NewAccountSubject {
    return form.getRawValue() as IAccountSubject | NewAccountSubject;
  }

  resetForm(form: AccountSubjectFormGroup, accountSubject: AccountSubjectFormGroupInput): void {
    const accountSubjectRawValue = { ...this.getFormDefaults(), ...accountSubject };
    form.reset(
      {
        ...accountSubjectRawValue,
        id: { value: accountSubjectRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountSubjectFormDefaults {
    return {
      id: null,
    };
  }
}
