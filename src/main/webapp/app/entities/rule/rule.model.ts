import dayjs from 'dayjs/esm';
import { IPrivilegeSet } from 'app/entities/privilege-set/privilege-set.model';
import { IRuleAccountSetPredicate } from 'app/entities/rule-account-set-predicate/rule-account-set-predicate.model';
import { IRuleAttributePredicate } from 'app/entities/rule-attribute-predicate/rule-attribute-predicate.model';

export interface IRule {
  id: number;
  ruleId?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  ruleId?: Pick<IPrivilegeSet, 'id'> | null;
  ruleId?: Pick<IRuleAccountSetPredicate, 'id'> | null;
  ruleId?: Pick<IRuleAttributePredicate, 'id'> | null;
}

export type NewRule = Omit<IRule, 'id'> & { id: null };
