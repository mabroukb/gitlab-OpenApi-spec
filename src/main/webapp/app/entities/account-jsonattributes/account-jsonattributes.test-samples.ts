import dayjs from 'dayjs/esm';

import { IAccountJsonattributes, NewAccountJsonattributes } from './account-jsonattributes.model';

export const sampleWithRequiredData: IAccountJsonattributes = {
  id: 31893,
};

export const sampleWithPartialData: IAccountJsonattributes = {
  id: 53518,
  accountId: 'application',
  accountJsonattributeId: 'project Solutions Engineer',
  startDate: dayjs('2022-12-17'),
  endDate: dayjs('2022-12-17'),
};

export const sampleWithFullData: IAccountJsonattributes = {
  id: 57751,
  accountId: 'Shoes Keyboard',
  json: '../fake-data/blob/hipster.txt',
  accountJsonattributeId: 'Account users attitude-oriented',
  startDate: dayjs('2022-12-16'),
  endDate: dayjs('2022-12-17'),
};

export const sampleWithNewData: NewAccountJsonattributes = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
