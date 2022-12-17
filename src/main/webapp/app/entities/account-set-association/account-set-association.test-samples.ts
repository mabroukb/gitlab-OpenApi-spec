import dayjs from 'dayjs/esm';

import { IAccountSetAssociation, NewAccountSetAssociation } from './account-set-association.model';

export const sampleWithRequiredData: IAccountSetAssociation = {
  id: 25801,
};

export const sampleWithPartialData: IAccountSetAssociation = {
  id: 99508,
  accountSetId: 'PNG drive',
  accountId: 'users blue',
};

export const sampleWithFullData: IAccountSetAssociation = {
  id: 92474,
  accountSetId: 'Delaware',
  accountId: 'Implemented',
  startDate: dayjs('2022-12-16'),
  endDate: dayjs('2022-12-16'),
};

export const sampleWithNewData: NewAccountSetAssociation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
