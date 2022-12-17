import { IRuleAccountSetPredicate, NewRuleAccountSetPredicate } from './rule-account-set-predicate.model';

export const sampleWithRequiredData: IRuleAccountSetPredicate = {
  id: 36620,
};

export const sampleWithPartialData: IRuleAccountSetPredicate = {
  id: 42325,
  ruleAccountSetPredicateId: 'cross-media executive',
  operator: 'Corporate',
  predicateOperand: 'turn-key',
};

export const sampleWithFullData: IRuleAccountSetPredicate = {
  id: 50140,
  ruleAccountSetPredicateId: 'Frozen Rapids',
  ruleId: 'intuitive scalable',
  accountSetId: 'Corporate Agent',
  operator: 'COM deposit',
  predicateOperand: 'Fantastic indexing',
};

export const sampleWithNewData: NewRuleAccountSetPredicate = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
