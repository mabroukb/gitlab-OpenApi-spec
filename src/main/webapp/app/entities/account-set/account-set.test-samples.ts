import { IAccountSet, NewAccountSet } from './account-set.model';

export const sampleWithRequiredData: IAccountSet = {
  id: 75029,
};

export const sampleWithPartialData: IAccountSet = {
  id: 55162,
  path: 'drive navigating program',
};

export const sampleWithFullData: IAccountSet = {
  id: 48465,
  accountSetId: 'Dakota Architect',
  name: 'Open-architected',
  superSetId: 'Iowa',
  path: 'database Integration',
};

export const sampleWithNewData: NewAccountSet = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
