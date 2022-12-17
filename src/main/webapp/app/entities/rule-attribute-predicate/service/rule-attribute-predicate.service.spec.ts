import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRuleAttributePredicate } from '../rule-attribute-predicate.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../rule-attribute-predicate.test-samples';

import { RuleAttributePredicateService } from './rule-attribute-predicate.service';

const requireRestSample: IRuleAttributePredicate = {
  ...sampleWithRequiredData,
};

describe('RuleAttributePredicate Service', () => {
  let service: RuleAttributePredicateService;
  let httpMock: HttpTestingController;
  let expectedResult: IRuleAttributePredicate | IRuleAttributePredicate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RuleAttributePredicateService);
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

    it('should create a RuleAttributePredicate', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ruleAttributePredicate = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ruleAttributePredicate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RuleAttributePredicate', () => {
      const ruleAttributePredicate = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ruleAttributePredicate).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RuleAttributePredicate', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RuleAttributePredicate', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RuleAttributePredicate', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRuleAttributePredicateToCollectionIfMissing', () => {
      it('should add a RuleAttributePredicate to an empty array', () => {
        const ruleAttributePredicate: IRuleAttributePredicate = sampleWithRequiredData;
        expectedResult = service.addRuleAttributePredicateToCollectionIfMissing([], ruleAttributePredicate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ruleAttributePredicate);
      });

      it('should not add a RuleAttributePredicate to an array that contains it', () => {
        const ruleAttributePredicate: IRuleAttributePredicate = sampleWithRequiredData;
        const ruleAttributePredicateCollection: IRuleAttributePredicate[] = [
          {
            ...ruleAttributePredicate,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRuleAttributePredicateToCollectionIfMissing(ruleAttributePredicateCollection, ruleAttributePredicate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RuleAttributePredicate to an array that doesn't contain it", () => {
        const ruleAttributePredicate: IRuleAttributePredicate = sampleWithRequiredData;
        const ruleAttributePredicateCollection: IRuleAttributePredicate[] = [sampleWithPartialData];
        expectedResult = service.addRuleAttributePredicateToCollectionIfMissing(ruleAttributePredicateCollection, ruleAttributePredicate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ruleAttributePredicate);
      });

      it('should add only unique RuleAttributePredicate to an array', () => {
        const ruleAttributePredicateArray: IRuleAttributePredicate[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ruleAttributePredicateCollection: IRuleAttributePredicate[] = [sampleWithRequiredData];
        expectedResult = service.addRuleAttributePredicateToCollectionIfMissing(
          ruleAttributePredicateCollection,
          ...ruleAttributePredicateArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ruleAttributePredicate: IRuleAttributePredicate = sampleWithRequiredData;
        const ruleAttributePredicate2: IRuleAttributePredicate = sampleWithPartialData;
        expectedResult = service.addRuleAttributePredicateToCollectionIfMissing([], ruleAttributePredicate, ruleAttributePredicate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ruleAttributePredicate);
        expect(expectedResult).toContain(ruleAttributePredicate2);
      });

      it('should accept null and undefined values', () => {
        const ruleAttributePredicate: IRuleAttributePredicate = sampleWithRequiredData;
        expectedResult = service.addRuleAttributePredicateToCollectionIfMissing([], null, ruleAttributePredicate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ruleAttributePredicate);
      });

      it('should return initial array if no RuleAttributePredicate is added', () => {
        const ruleAttributePredicateCollection: IRuleAttributePredicate[] = [sampleWithRequiredData];
        expectedResult = service.addRuleAttributePredicateToCollectionIfMissing(ruleAttributePredicateCollection, undefined, null);
        expect(expectedResult).toEqual(ruleAttributePredicateCollection);
      });
    });

    describe('compareRuleAttributePredicate', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRuleAttributePredicate(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRuleAttributePredicate(entity1, entity2);
        const compareResult2 = service.compareRuleAttributePredicate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRuleAttributePredicate(entity1, entity2);
        const compareResult2 = service.compareRuleAttributePredicate(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRuleAttributePredicate(entity1, entity2);
        const compareResult2 = service.compareRuleAttributePredicate(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
