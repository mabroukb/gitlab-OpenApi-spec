import { IAccountSetAssociation } from 'app/entities/account-set-association/account-set-association.model';
import { IAccountJsonattributes } from 'app/entities/account-jsonattributes/account-jsonattributes.model';

export interface IAccountSubject {
  id: number;
  accountId?: string | null;
  principal?: string | null;
  accountId?: Pick<IAccountSetAssociation, 'id'> | null;
  accountId?: Pick<IAccountJsonattributes, 'id'> | null;
}

export type NewAccountSubject = Omit<IAccountSubject, 'id'> & { id: null };
