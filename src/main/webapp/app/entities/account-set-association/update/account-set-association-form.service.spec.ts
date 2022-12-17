import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../account-set-association.test-samples';

import { AccountSetAssociationFormService } from './account-set-association-form.service';

describe('AccountSetAssociation Form Service', () => {
  let service: AccountSetAssociationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSetAssociationFormService);
  });

  describe('Service methods', () => {
    describe('createAccountSetAssociationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountSetAssociationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountSetId: expect.any(Object),
            accountId: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
          })
        );
      });

      it('passing IAccountSetAssociation should create a new form with FormGroup', () => {
        const formGroup = service.createAccountSetAssociationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountSetId: expect.any(Object),
            accountId: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountSetAssociation', () => {
      it('should return NewAccountSetAssociation for default AccountSetAssociation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountSetAssociationFormGroup(sampleWithNewData);

        const accountSetAssociation = service.getAccountSetAssociation(formGroup) as any;

        expect(accountSetAssociation).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountSetAssociation for empty AccountSetAssociation initial value', () => {
        const formGroup = service.createAccountSetAssociationFormGroup();

        const accountSetAssociation = service.getAccountSetAssociation(formGroup) as any;

        expect(accountSetAssociation).toMatchObject({});
      });

      it('should return IAccountSetAssociation', () => {
        const formGroup = service.createAccountSetAssociationFormGroup(sampleWithRequiredData);

        const accountSetAssociation = service.getAccountSetAssociation(formGroup) as any;

        expect(accountSetAssociation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountSetAssociation should not enable id FormControl', () => {
        const formGroup = service.createAccountSetAssociationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountSetAssociation should disable id FormControl', () => {
        const formGroup = service.createAccountSetAssociationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
