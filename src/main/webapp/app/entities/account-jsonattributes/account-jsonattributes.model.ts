import dayjs from 'dayjs/esm';

export interface IAccountJsonattributes {
  id: number;
  accountId?: string | null;
  json?: string | null;
  accountJsonattributeId?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
}

export type NewAccountJsonattributes = Omit<IAccountJsonattributes, 'id'> & { id: null };
