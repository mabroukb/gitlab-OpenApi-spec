import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../rule-account-set-predicate.test-samples';

import { RuleAccountSetPredicateFormService } from './rule-account-set-predicate-form.service';

describe('RuleAccountSetPredicate Form Service', () => {
  let service: RuleAccountSetPredicateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleAccountSetPredicateFormService);
  });

  describe('Service methods', () => {
    describe('createRuleAccountSetPredicateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRuleAccountSetPredicateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ruleAccountSetPredicateId: expect.any(Object),
            ruleId: expect.any(Object),
            accountSetId: expect.any(Object),
            operator: expect.any(Object),
            predicateOperand: expect.any(Object),
          })
        );
      });

      it('passing IRuleAccountSetPredicate should create a new form with FormGroup', () => {
        const formGroup = service.createRuleAccountSetPredicateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ruleAccountSetPredicateId: expect.any(Object),
            ruleId: expect.any(Object),
            accountSetId: expect.any(Object),
            operator: expect.any(Object),
            predicateOperand: expect.any(Object),
          })
        );
      });
    });

    describe('getRuleAccountSetPredicate', () => {
      it('should return NewRuleAccountSetPredicate for default RuleAccountSetPredicate initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRuleAccountSetPredicateFormGroup(sampleWithNewData);

        const ruleAccountSetPredicate = service.getRuleAccountSetPredicate(formGroup) as any;

        expect(ruleAccountSetPredicate).toMatchObject(sampleWithNewData);
      });

      it('should return NewRuleAccountSetPredicate for empty RuleAccountSetPredicate initial value', () => {
        const formGroup = service.createRuleAccountSetPredicateFormGroup();

        const ruleAccountSetPredicate = service.getRuleAccountSetPredicate(formGroup) as any;

        expect(ruleAccountSetPredicate).toMatchObject({});
      });

      it('should return IRuleAccountSetPredicate', () => {
        const formGroup = service.createRuleAccountSetPredicateFormGroup(sampleWithRequiredData);

        const ruleAccountSetPredicate = service.getRuleAccountSetPredicate(formGroup) as any;

        expect(ruleAccountSetPredicate).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRuleAccountSetPredicate should not enable id FormControl', () => {
        const formGroup = service.createRuleAccountSetPredicateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRuleAccountSetPredicate should disable id FormControl', () => {
        const formGroup = service.createRuleAccountSetPredicateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
