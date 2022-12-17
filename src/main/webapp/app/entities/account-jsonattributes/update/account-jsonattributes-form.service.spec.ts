import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../account-jsonattributes.test-samples';

import { AccountJsonattributesFormService } from './account-jsonattributes-form.service';

describe('AccountJsonattributes Form Service', () => {
  let service: AccountJsonattributesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountJsonattributesFormService);
  });

  describe('Service methods', () => {
    describe('createAccountJsonattributesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountJsonattributesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountId: expect.any(Object),
            json: expect.any(Object),
            accountJsonattributeId: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
          })
        );
      });

      it('passing IAccountJsonattributes should create a new form with FormGroup', () => {
        const formGroup = service.createAccountJsonattributesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountId: expect.any(Object),
            json: expect.any(Object),
            accountJsonattributeId: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountJsonattributes', () => {
      it('should return NewAccountJsonattributes for default AccountJsonattributes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountJsonattributesFormGroup(sampleWithNewData);

        const accountJsonattributes = service.getAccountJsonattributes(formGroup) as any;

        expect(accountJsonattributes).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountJsonattributes for empty AccountJsonattributes initial value', () => {
        const formGroup = service.createAccountJsonattributesFormGroup();

        const accountJsonattributes = service.getAccountJsonattributes(formGroup) as any;

        expect(accountJsonattributes).toMatchObject({});
      });

      it('should return IAccountJsonattributes', () => {
        const formGroup = service.createAccountJsonattributesFormGroup(sampleWithRequiredData);

        const accountJsonattributes = service.getAccountJsonattributes(formGroup) as any;

        expect(accountJsonattributes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountJsonattributes should not enable id FormControl', () => {
        const formGroup = service.createAccountJsonattributesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountJsonattributes should disable id FormControl', () => {
        const formGroup = service.createAccountJsonattributesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
