import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRuleAccountSetPredicate } from '../rule-account-set-predicate.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../rule-account-set-predicate.test-samples';

import { RuleAccountSetPredicateService } from './rule-account-set-predicate.service';

const requireRestSample: IRuleAccountSetPredicate = {
  ...sampleWithRequiredData,
};

describe('RuleAccountSetPredicate Service', () => {
  let service: RuleAccountSetPredicateService;
  let httpMock: HttpTestingController;
  let expectedResult: IRuleAccountSetPredicate | IRuleAccountSetPredicate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RuleAccountSetPredicateService);
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

    it('should create a RuleAccountSetPredicate', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ruleAccountSetPredicate = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ruleAccountSetPredicate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RuleAccountSetPredicate', () => {
      const ruleAccountSetPredicate = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ruleAccountSetPredicate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RuleAccountSetPredicate', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RuleAccountSetPredicate', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RuleAccountSetPredicate', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRuleAccountSetPredicateToCollectionIfMissing', () => {
      it('should add a RuleAccountSetPredicate to an empty array', () => {
        const ruleAccountSetPredicate: IRuleAccountSetPredicate = sampleWithRequiredData;
        expectedResult = service.addRuleAccountSetPredicateToCollectionIfMissing([], ruleAccountSetPredicate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ruleAccountSetPredicate);
      });

      it('should not add a RuleAccountSetPredicate to an array that contains it', () => {
        const ruleAccountSetPredicate: IRuleAccountSetPredicate = sampleWithRequiredData;
        const ruleAccountSetPredicateCollection: IRuleAccountSetPredicate[] = [
          {
            ...ruleAccountSetPredicate,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRuleAccountSetPredicateToCollectionIfMissing(
          ruleAccountSetPredicateCollection,
          ruleAccountSetPredicate
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RuleAccountSetPredicate to an array that doesn't contain it", () => {
        const ruleAccountSetPredicate: IRuleAccountSetPredicate = sampleWithRequiredData;
        const ruleAccountSetPredicateCollection: IRuleAccountSetPredicate[] = [sampleWithPartialData];
        expectedResult = service.addRuleAccountSetPredicateToCollectionIfMissing(
          ruleAccountSetPredicateCollection,
          ruleAccountSetPredicate
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ruleAccountSetPredicate);
      });

      it('should add only unique RuleAccountSetPredicate to an array', () => {
        const ruleAccountSetPredicateArray: IRuleAccountSetPredicate[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const ruleAccountSetPredicateCollection: IRuleAccountSetPredicate[] = [sampleWithRequiredData];
        expectedResult = service.addRuleAccountSetPredicateToCollectionIfMissing(
          ruleAccountSetPredicateCollection,
          ...ruleAccountSetPredicateArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ruleAccountSetPredicate: IRuleAccountSetPredicate = sampleWithRequiredData;
        const ruleAccountSetPredicate2: IRuleAccountSetPredicate = sampleWithPartialData;
        expectedResult = service.addRuleAccountSetPredicateToCollectionIfMissing([], ruleAccountSetPredicate, ruleAccountSetPredicate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ruleAccountSetPredicate);
        expect(expectedResult).toContain(ruleAccountSetPredicate2);
      });

      it('should accept null and undefined values', () => {
        const ruleAccountSetPredicate: IRuleAccountSetPredicate = sampleWithRequiredData;
        expectedResult = service.addRuleAccountSetPredicateToCollectionIfMissing([], null, ruleAccountSetPredicate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ruleAccountSetPredicate);
      });

      it('should return initial array if no RuleAccountSetPredicate is added', () => {
        const ruleAccountSetPredicateCollection: IRuleAccountSetPredicate[] = [sampleWithRequiredData];
        expectedResult = service.addRuleAccountSetPredicateToCollectionIfMissing(ruleAccountSetPredicateCollection, undefined, null);
        expect(expectedResult).toEqual(ruleAccountSetPredicateCollection);
      });
    });

    describe('compareRuleAccountSetPredicate', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRuleAccountSetPredicate(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRuleAccountSetPredicate(entity1, entity2);
        const compareResult2 = service.compareRuleAccountSetPredicate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRuleAccountSetPredicate(entity1, entity2);
        const compareResult2 = service.compareRuleAccountSetPredicate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRuleAccountSetPredicate(entity1, entity2);
        const compareResult2 = service.compareRuleAccountSetPredicate(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
