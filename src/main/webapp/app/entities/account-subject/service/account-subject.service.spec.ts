import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAccountSubject } from '../account-subject.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../account-subject.test-samples';

import { AccountSubjectService } from './account-subject.service';

const requireRestSample: IAccountSubject = {
  ...sampleWithRequiredData,
};

describe('AccountSubject Service', () => {
  let service: AccountSubjectService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountSubject | IAccountSubject[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccountSubjectService);
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

    it('should create a AccountSubject', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountSubject = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountSubject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AccountSubject', () => {
      const accountSubject = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountSubject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AccountSubject', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AccountSubject', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AccountSubject', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccountSubjectToCollectionIfMissing', () => {
      it('should add a AccountSubject to an empty array', () => {
        const accountSubject: IAccountSubject = sampleWithRequiredData;
        expectedResult = service.addAccountSubjectToCollectionIfMissing([], accountSubject);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountSubject);
      });

      it('should not add a AccountSubject to an array that contains it', () => {
        const accountSubject: IAccountSubject = sampleWithRequiredData;
        const accountSubjectCollection: IAccountSubject[] = [
          {
            ...accountSubject,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccountSubjectToCollectionIfMissing(accountSubjectCollection, accountSubject);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AccountSubject to an array that doesn't contain it", () => {
        const accountSubject: IAccountSubject = sampleWithRequiredData;
        const accountSubjectCollection: IAccountSubject[] = [sampleWithPartialData];
        expectedResult = service.addAccountSubjectToCollectionIfMissing(accountSubjectCollection, accountSubject);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountSubject);
      });

      it('should add only unique AccountSubject to an array', () => {
        const accountSubjectArray: IAccountSubject[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accountSubjectCollection: IAccountSubject[] = [sampleWithRequiredData];
        expectedResult = service.addAccountSubjectToCollectionIfMissing(accountSubjectCollection, ...accountSubjectArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountSubject: IAccountSubject = sampleWithRequiredData;
        const accountSubject2: IAccountSubject = sampleWithPartialData;
        expectedResult = service.addAccountSubjectToCollectionIfMissing([], accountSubject, accountSubject2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountSubject);
        expect(expectedResult).toContain(accountSubject2);
      });

      it('should accept null and undefined values', () => {
        const accountSubject: IAccountSubject = sampleWithRequiredData;
        expectedResult = service.addAccountSubjectToCollectionIfMissing([], null, accountSubject, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountSubject);
      });

      it('should return initial array if no AccountSubject is added', () => {
        const accountSubjectCollection: IAccountSubject[] = [sampleWithRequiredData];
        expectedResult = service.addAccountSubjectToCollectionIfMissing(accountSubjectCollection, undefined, null);
        expect(expectedResult).toEqual(accountSubjectCollection);
      });
    });

    describe('compareAccountSubject', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountSubject(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountSubject(entity1, entity2);
        const compareResult2 = service.compareAccountSubject(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountSubject(entity1, entity2);
        const compareResult2 = service.compareAccountSubject(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountSubject(entity1, entity2);
        const compareResult2 = service.compareAccountSubject(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
