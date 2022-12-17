import { IAccountSetAssociation } from 'app/entities/account-set-association/account-set-association.model';

export interface IAccountSet {
  id: number;
  accountSetId?: string | null;
  name?: string | null;
  superSetId?: string | null;
  path?: string | null;
  accountSetId?: Pick<IAccountSetAssociation, 'id'> | null;
}

export type NewAccountSet = Omit<IAccountSet, 'id'> & { id: null };
