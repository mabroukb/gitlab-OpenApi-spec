export interface IRuleAttributePredicate {
  id: number;
  ruleAttributePredicateId?: string | null;
  ruleId?: string | null;
  attributeName?: string | null;
  operator?: string | null;
  attributeValues?: string | null;
}

export type NewRuleAttributePredicate = Omit<IRuleAttributePredicate, 'id'> & { id: null };
