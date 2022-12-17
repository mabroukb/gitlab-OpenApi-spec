import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../rule.test-samples';

import { RuleFormService } from './rule-form.service';

describe('Rule Form Service', () => {
  let service: RuleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleFormService);
  });

  describe('Service methods', () => {
    describe('createRuleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRuleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ruleId: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            ruleId: expect.any(Object),
            ruleId: expect.any(Object),
            ruleId: expect.any(Object),
          })
        );
      });

      it('passing IRule should create a new form with FormGroup', () => {
        const formGroup = service.createRuleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ruleId: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            ruleId: expect.any(Object),
            ruleId: expect.any(Object),
            ruleId: expect.any(Object),
          })
        );
      });
    });

    describe('getRule', () => {
      it('should return NewRule for default Rule initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRuleFormGroup(sampleWithNewData);

        const rule = service.getRule(formGroup) as any;

        expect(rule).toMatchObject(sampleWithNewData);
      });

      it('should return NewRule for empty Rule initial value', () => {
        const formGroup = service.createRuleFormGroup();

        const rule = service.getRule(formGroup) as any;

        expect(rule).toMatchObject({});
      });

      it('should return IRule', () => {
        const formGroup = service.createRuleFormGroup(sampleWithRequiredData);

        const rule = service.getRule(formGroup) as any;

        expect(rule).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRule should not enable id FormControl', () => {
        const formGroup = service.createRuleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRule should disable id FormControl', () => {
        const formGroup = service.createRuleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
