import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../rule-attribute-predicate.test-samples';

import { RuleAttributePredicateFormService } from './rule-attribute-predicate-form.service';

describe('RuleAttributePredicate Form Service', () => {
  let service: RuleAttributePredicateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleAttributePredicateFormService);
  });

  describe('Service methods', () => {
    describe('createRuleAttributePredicateFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRuleAttributePredicateFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ruleAttributePredicateId: expect.any(Object),
            ruleId: expect.any(Object),
            attributeName: expect.any(Object),
            operator: expect.any(Object),
            attributeValues: expect.any(Object),
          })
        );
      });

      it('passing IRuleAttributePredicate should create a new form with FormGroup', () => {
        const formGroup = service.createRuleAttributePredicateFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ruleAttributePredicateId: expect.any(Object),
            ruleId: expect.any(Object),
            attributeName: expect.any(Object),
            operator: expect.any(Object),
            attributeValues: expect.any(Object),
          })
        );
      });
    });

    describe('getRuleAttributePredicate', () => {
      it('should return NewRuleAttributePredicate for default RuleAttributePredicate initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRuleAttributePredicateFormGroup(sampleWithNewData);

        const ruleAttributePredicate = service.getRuleAttributePredicate(formGroup) as any;

        expect(ruleAttributePredicate).toMatchObject(sampleWithNewData);
      });

      it('should return NewRuleAttributePredicate for empty RuleAttributePredicate initial value', () => {
        const formGroup = service.createRuleAttributePredicateFormGroup();

        const ruleAttributePredicate = service.getRuleAttributePredicate(formGroup) as any;

        expect(ruleAttributePredicate).toMatchObject({});
      });

      it('should return IRuleAttributePredicate', () => {
        const formGroup = service.createRuleAttributePredicateFormGroup(sampleWithRequiredData);

        const ruleAttributePredicate = service.getRuleAttributePredicate(formGroup) as any;

        expect(ruleAttributePredicate).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRuleAttributePredicate should not enable id FormControl', () => {
        const formGroup = service.createRuleAttributePredicateFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRuleAttributePredicate should disable id FormControl', () => {
        const formGroup = service.createRuleAttributePredicateFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
