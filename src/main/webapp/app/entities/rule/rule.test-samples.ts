import dayjs from 'dayjs/esm';

import { IRule, NewRule } from './rule.model';

export const sampleWithRequiredData: IRule = {
  id: 9592,
};

export const sampleWithPartialData: IRule = {
  id: 60477,
  ruleId: 'hardware',
  startDate: dayjs('2022-12-17'),
};

export const sampleWithFullData: IRule = {
  id: 97757,
  ruleId: 'Car Fish Fish',
  startDate: dayjs('2022-12-17'),
  endDate: dayjs('2022-12-17'),
};

export const sampleWithNewData: NewRule = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
