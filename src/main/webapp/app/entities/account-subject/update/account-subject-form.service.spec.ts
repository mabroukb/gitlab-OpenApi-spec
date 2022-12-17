import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../account-subject.test-samples';

import { AccountSubjectFormService } from './account-subject-form.service';

describe('AccountSubject Form Service', () => {
  let service: AccountSubjectFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSubjectFormService);
  });

  describe('Service methods', () => {
    describe('createAccountSubjectFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountSubjectFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountId: expect.any(Object),
            principal: expect.any(Object),
            accountId: expect.any(Object),
            accountId: expect.any(Object),
          })
        );
      });

      it('passing IAccountSubject should create a new form with FormGroup', () => {
        const formGroup = service.createAccountSubjectFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountId: expect.any(Object),
            principal: expect.any(Object),
            accountId: expect.any(Object),
            accountId: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountSubject', () => {
      it('should return NewAccountSubject for default AccountSubject initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccountSubjectFormGroup(sampleWithNewData);

        const accountSubject = service.getAccountSubject(formGroup) as any;

        expect(accountSubject).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountSubject for empty AccountSubject initial value', () => {
        const formGroup = service.createAccountSubjectFormGroup();

        const accountSubject = service.getAccountSubject(formGroup) as any;

        expect(accountSubject).toMatchObject({});
      });

      it('should return IAccountSubject', () => {
        const formGroup = service.createAccountSubjectFormGroup(sampleWithRequiredData);

        const accountSubject = service.getAccountSubject(formGroup) as any;

        expect(accountSubject).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountSubject should not enable id FormControl', () => {
        const formGroup = service.createAccountSubjectFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountSubject should disable id FormControl', () => {
        const formGroup = service.createAccountSubjectFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
