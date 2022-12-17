import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IAccountSetAssociation } from '../account-set-association.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../account-set-association.test-samples';

import { AccountSetAssociationService, RestAccountSetAssociation } from './account-set-association.service';

const requireRestSample: RestAccountSetAssociation = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.format(DATE_FORMAT),
  endDate: sampleWithRequiredData.endDate?.format(DATE_FORMAT),
};

describe('AccountSetAssociation Service', () => {
  let service: AccountSetAssociationService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountSetAssociation | IAccountSetAssociation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountSetAssociationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a AccountSetAssociation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountSetAssociation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountSetAssociation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountSetAssociation', () => {
      const accountSetAssociation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountSetAssociation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountSetAssociation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountSetAssociation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountSetAssociation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountSetAssociationToCollectionIfMissing', () => {
      it('should add a AccountSetAssociation to an empty array', () => {
        const accountSetAssociation: IAccountSetAssociation = sampleWithRequiredData;
        expectedResult = service.addAccountSetAssociationToCollectionIfMissing([], accountSetAssociation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountSetAssociation);
      });

      it('should not add a AccountSetAssociation to an array that contains it', () => {
        const accountSetAssociation: IAccountSetAssociation = sampleWithRequiredData;
        const accountSetAssociationCollection: IAccountSetAssociation[] = [
          {
            ...accountSetAssociation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountSetAssociationToCollectionIfMissing(accountSetAssociationCollection, accountSetAssociation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountSetAssociation to an array that doesn't contain it", () => {
        const accountSetAssociation: IAccountSetAssociation = sampleWithRequiredData;
        const accountSetAssociationCollection: IAccountSetAssociation[] = [sampleWithPartialData];
        expectedResult = service.addAccountSetAssociationToCollectionIfMissing(accountSetAssociationCollection, accountSetAssociation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountSetAssociation);
      });

      it('should add only unique AccountSetAssociation to an array', () => {
        const accountSetAssociationArray: IAccountSetAssociation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountSetAssociationCollection: IAccountSetAssociation[] = [sampleWithRequiredData];
        expectedResult = service.addAccountSetAssociationToCollectionIfMissing(
          accountSetAssociationCollection,
          ...accountSetAssociationArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountSetAssociation: IAccountSetAssociation = sampleWithRequiredData;
        const accountSetAssociation2: IAccountSetAssociation = sampleWithPartialData;
        expectedResult = service.addAccountSetAssociationToCollectionIfMissing([], accountSetAssociation, accountSetAssociation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountSetAssociation);
        expect(expectedResult).toContain(accountSetAssociation2);
      });

      it('should accept null and undefined values', () => {
        const accountSetAssociation: IAccountSetAssociation = sampleWithRequiredData;
        expectedResult = service.addAccountSetAssociationToCollectionIfMissing([], null, accountSetAssociation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountSetAssociation);
      });

      it('should return initial array if no AccountSetAssociation is added', () => {
        const accountSetAssociationCollection: IAccountSetAssociation[] = [sampleWithRequiredData];
        expectedResult = service.addAccountSetAssociationToCollectionIfMissing(accountSetAssociationCollection, undefined, null);
        expect(expectedResult).toEqual(accountSetAssociationCollection);
      });
    });

    describe('compareAccountSetAssociation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountSetAssociation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountSetAssociation(entity1, entity2);
        const compareResult2 = service.compareAccountSetAssociation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountSetAssociation(entity1, entity2);
        const compareResult2 = service.compareAccountSetAssociation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountSetAssociation(entity1, entity2);
        const compareResult2 = service.compareAccountSetAssociation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
