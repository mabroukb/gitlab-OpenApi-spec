import { IRuleAttributePredicate, NewRuleAttributePredicate } from './rule-attribute-predicate.model';

export const sampleWithRequiredData: IRuleAttributePredicate = {
  id: 41891,
};

export const sampleWithPartialData: IRuleAttributePredicate = {
  id: 31435,
  attributeName: 'Tasty Steel',
  operator: 'payment',
  attributeValues: 'Tunnel Rubber quantify',
};

export const sampleWithFullData: IRuleAttributePredicate = {
  id: 75785,
  ruleAttributePredicateId: 'technologies Tuna',
  ruleId: 'virtual Hat Architect',
  attributeName: 'tangible Rubber Mobility',
  operator: 'Bacon Frozen',
  attributeValues: 'Handmade Coordinator',
};

export const sampleWithNewData: NewRuleAttributePredicate = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
