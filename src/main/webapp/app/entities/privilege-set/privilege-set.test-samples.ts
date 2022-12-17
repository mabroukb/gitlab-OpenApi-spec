import { IPrivilegeSet, NewPrivilegeSet } from './privilege-set.model';

export const sampleWithRequiredData: IPrivilegeSet = {
  id: 24165,
};

export const sampleWithPartialData: IPrivilegeSet = {
  id: 90148,
  ruleId: 'Tasty CSS',
};

export const sampleWithFullData: IPrivilegeSet = {
  id: 48372,
  privilegeSetId: 'Plastic red',
  privilege: 'digital Branding',
  ruleId: 'transmitter asymmetric Steel',
};

export const sampleWithNewData: NewPrivilegeSet = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
