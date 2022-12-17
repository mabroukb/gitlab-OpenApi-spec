import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../account-set.test-samples';

import { AccountSetFormService } from './account-set-form.service';

describe('AccountSet Form Service', () => {
  let service: AccountSetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSetFormService);
  });

  describe('Service methods', () => {
    describe('createAccountSetFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountSetFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountSetId: expect.any(Object),
            name: expect.any(Object),
            superSetId: expect.any(Object),
            path: expect.any(Object),
            accountSetId: expect.any(Object),
          })
        );
      });

      it('passing IAccountSet should create a new form with FormGroup', () => {
        const formGroup = service.createAccountSetFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountSetId: expect.any(Object),
            name: expect.any(Object),
            superSetId: expect.any(Object),
            path: expect.any(Object),
            accountSetId: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountSet', () => {
      it('should return NewAccountSet for default AccountSet initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountSetFormGroup(sampleWithNewData);

        const accountSet = service.getAccountSet(formGroup) as any;

        expect(accountSet).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountSet for empty AccountSet initial value', () => {
        const formGroup = service.createAccountSetFormGroup();

        const accountSet = service.getAccountSet(formGroup) as any;

        expect(accountSet).toMatchObject({});
      });

      it('should return IAccountSet', () => {
        const formGroup = service.createAccountSetFormGroup(sampleWithRequiredData);

        const accountSet = service.getAccountSet(formGroup) as any;

        expect(accountSet).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountSet should not enable id FormControl', () => {
        const formGroup = service.createAccountSetFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountSet should disable id FormControl', () => {
        const formGroup = service.createAccountSetFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
