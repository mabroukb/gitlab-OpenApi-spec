import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IRule } from '../rule.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../rule.test-samples';

import { RuleService, RestRule } from './rule.service';

const requireRestSample: RestRule = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.format(DATE_FORMAT),
  endDate: sampleWithRequiredData.endDate?.format(DATE_FORMAT),
};

describe('Rule Service', () => {
  let service: RuleService;
  let httpMock: HttpTestingController;
  let expectedResult: IRule | IRule[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RuleService);
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

    it('should create a Rule', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const rule = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(rule).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Rule', () => {
      const rule = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(rule).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Rule', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Rule', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Rule', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRuleToCollectionIfMissing', () => {
      it('should add a Rule to an empty array', () => {
        const rule: IRule = sampleWithRequiredData;
        expectedResult = service.addRuleToCollectionIfMissing([], rule);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rule);
      });

      it('should not add a Rule to an array that contains it', () => {
        const rule: IRule = sampleWithRequiredData;
        const ruleCollection: IRule[] = [
          {
            ...rule,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRuleToCollectionIfMissing(ruleCollection, rule);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Rule to an array that doesn't contain it", () => {
        const rule: IRule = sampleWithRequiredData;
        const ruleCollection: IRule[] = [sampleWithPartialData];
        expectedResult = service.addRuleToCollectionIfMissing(ruleCollection, rule);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rule);
      });

      it('should add only unique Rule to an array', () => {
        const ruleArray: IRule[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ruleCollection: IRule[] = [sampleWithRequiredData];
        expectedResult = service.addRuleToCollectionIfMissing(ruleCollection, ...ruleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rule: IRule = sampleWithRequiredData;
        const rule2: IRule = sampleWithPartialData;
        expectedResult = service.addRuleToCollectionIfMissing([], rule, rule2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rule);
        expect(expectedResult).toContain(rule2);
      });

      it('should accept null and undefined values', () => {
        const rule: IRule = sampleWithRequiredData;
        expectedResult = service.addRuleToCollectionIfMissing([], null, rule, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rule);
      });

      it('should return initial array if no Rule is added', () => {
        const ruleCollection: IRule[] = [sampleWithRequiredData];
        expectedResult = service.addRuleToCollectionIfMissing(ruleCollection, undefined, null);
        expect(expectedResult).toEqual(ruleCollection);
      });
    });

    describe('compareRule', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRule(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRule(entity1, entity2);
        const compareResult2 = service.compareRule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRule(entity1, entity2);
        const compareResult2 = service.compareRule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRule(entity1, entity2);
        const compareResult2 = service.compareRule(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
