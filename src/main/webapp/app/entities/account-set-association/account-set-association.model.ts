import dayjs from 'dayjs/esm';

export interface IAccountSetAssociation {
  id: number;
  accountSetId?: string | null;
  accountId?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
}

export type NewAccountSetAssociation = Omit<IAccountSetAssociation, 'id'> & { id: null };
