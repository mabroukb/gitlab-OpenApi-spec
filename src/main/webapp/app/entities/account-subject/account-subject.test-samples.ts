import { IAccountSubject, NewAccountSubject } from './account-subject.model';

export const sampleWithRequiredData: IAccountSubject = {
  id: 82860,
};

export const sampleWithPartialData: IAccountSubject = {
  id: 42077,
  principal: 'Zambian Steel Industrial',
};

export const sampleWithFullData: IAccountSubject = {
  id: 99640,
  accountId: 'neutral',
  principal: 'Cambridgeshire',
};

export const sampleWithNewData: NewAccountSubject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
