import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../privilege-set.test-samples';

import { PrivilegeSetFormService } from './privilege-set-form.service';

describe('PrivilegeSet Form Service', () => {
  let service: PrivilegeSetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegeSetFormService);
  });

  describe('Service methods', () => {
    describe('createPrivilegeSetFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPrivilegeSetFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            privilegeSetId: expect.any(Object),
            privilege: expect.any(Object),
            ruleId: expect.any(Object),
          })
        );
      });

      it('passing IPrivilegeSet should create a new form with FormGroup', () => {
        const formGroup = service.createPrivilegeSetFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            privilegeSetId: expect.any(Object),
            privilege: expect.any(Object),
            ruleId: expect.any(Object),
          })
        );
      });
    });

    describe('getPrivilegeSet', () => {
      it('should return NewPrivilegeSet for default PrivilegeSet initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPrivilegeSetFormGroup(sampleWithNewData);

        const privilegeSet = service.getPrivilegeSet(formGroup) as any;

        expect(privilegeSet).toMatchObject(sampleWithNewData);
      });

      it('should return NewPrivilegeSet for empty PrivilegeSet initial value', () => {
        const formGroup = service.createPrivilegeSetFormGroup();

        const privilegeSet = service.getPrivilegeSet(formGroup) as any;

        expect(privilegeSet).toMatchObject({});
      });

      it('should return IPrivilegeSet', () => {
        const formGroup = service.createPrivilegeSetFormGroup(sampleWithRequiredData);

        const privilegeSet = service.getPrivilegeSet(formGroup) as any;

        expect(privilegeSet).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPrivilegeSet should not enable id FormControl', () => {
        const formGroup = service.createPrivilegeSetFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPrivilegeSet should disable id FormControl', () => {
        const formGroup = service.createPrivilegeSetFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
