export interface IPrivilegeSet {
  id: number;
  privilegeSetId?: string | null;
  privilege?: string | null;
  ruleId?: string | null;
}

export type NewPrivilegeSet = Omit<IPrivilegeSet, 'id'> & { id: null };
