import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPrivilegeSet } from '../privilege-set.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../privilege-set.test-samples';

import { PrivilegeSetService } from './privilege-set.service';

const requireRestSample: IPrivilegeSet = {
  ...sampleWithRequiredData,
};

describe('PrivilegeSet Service', () => {
  let service: PrivilegeSetService;
  let httpMock: HttpTestingController;
  let expectedResult: IPrivilegeSet | IPrivilegeSet[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PrivilegeSetService);
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

    it('should create a PrivilegeSet', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const privilegeSet = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(privilegeSet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PrivilegeSet', () => {
      const privilegeSet = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(privilegeSet).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PrivilegeSet', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PrivilegeSet', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PrivilegeSet', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPrivilegeSetToCollectionIfMissing', () => {
      it('should add a PrivilegeSet to an empty array', () => {
        const privilegeSet: IPrivilegeSet = sampleWithRequiredData;
        expectedResult = service.addPrivilegeSetToCollectionIfMissing([], privilegeSet);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(privilegeSet);
      });

      it('should not add a PrivilegeSet to an array that contains it', () => {
        const privilegeSet: IPrivilegeSet = sampleWithRequiredData;
        const privilegeSetCollection: IPrivilegeSet[] = [
          {
            ...privilegeSet,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPrivilegeSetToCollectionIfMissing(privilegeSetCollection, privilegeSet);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PrivilegeSet to an array that doesn't contain it", () => {
        const privilegeSet: IPrivilegeSet = sampleWithRequiredData;
        const privilegeSetCollection: IPrivilegeSet[] = [sampleWithPartialData];
        expectedResult = service.addPrivilegeSetToCollectionIfMissing(privilegeSetCollection, privilegeSet);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(privilegeSet);
      });

      it('should add only unique PrivilegeSet to an array', () => {
        const privilegeSetArray: IPrivilegeSet[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const privilegeSetCollection: IPrivilegeSet[] = [sampleWithRequiredData];
        expectedResult = service.addPrivilegeSetToCollectionIfMissing(privilegeSetCollection, ...privilegeSetArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const privilegeSet: IPrivilegeSet = sampleWithRequiredData;
        const privilegeSet2: IPrivilegeSet = sampleWithPartialData;
        expectedResult = service.addPrivilegeSetToCollectionIfMissing([], privilegeSet, privilegeSet2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(privilegeSet);
        expect(expectedResult).toContain(privilegeSet2);
      });

      it('should accept null and undefined values', () => {
        const privilegeSet: IPrivilegeSet = sampleWithRequiredData;
        expectedResult = service.addPrivilegeSetToCollectionIfMissing([], null, privilegeSet, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(privilegeSet);
      });

      it('should return initial array if no PrivilegeSet is added', () => {
        const privilegeSetCollection: IPrivilegeSet[] = [sampleWithRequiredData];
        expectedResult = service.addPrivilegeSetToCollectionIfMissing(privilegeSetCollection, undefined, null);
        expect(expectedResult).toEqual(privilegeSetCollection);
      });
    });

    describe('comparePrivilegeSet', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePrivilegeSet(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePrivilegeSet(entity1, entity2);
        const compareResult2 = service.comparePrivilegeSet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePrivilegeSet(entity1, entity2);
        const compareResult2 = service.comparePrivilegeSet(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePrivilegeSet(entity1, entity2);
        const compareResult2 = service.comparePrivilegeSet(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
