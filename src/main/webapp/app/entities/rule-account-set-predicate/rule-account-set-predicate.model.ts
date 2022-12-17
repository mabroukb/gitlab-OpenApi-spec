export interface IRuleAccountSetPredicate {
  id: number;
  ruleAccountSetPredicateId?: string | null;
  ruleId?: string | null;
  accountSetId?: string | null;
  operator?: string | null;
  predicateOperand?: string | null;
}

export type NewRuleAccountSetPredicate = Omit<IRuleAccountSetPredicate, 'id'> & { id: null };
