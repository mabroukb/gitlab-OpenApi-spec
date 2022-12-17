import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRuleAccountSetPredicate } from '../rule-account-set-predicate.model';
import { RuleAccountSetPredicateService } from '../service/rule-account-set-predicate.service';

import { RuleAccountSetPredicateRoutingResolveService } from './rule-account-set-predicate-routing-resolve.service';

describe('RuleAccountSetPredicate routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RuleAccountSetPredicateRoutingResolveService;
  let service: RuleAccountSetPredicateService;
  let resultRuleAccountSetPredicate: IRuleAccountSetPredicate | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(RuleAccountSetPredicateRoutingResolveService);
    service = TestBed.inject(RuleAccountSetPredicateService);
    resultRuleAccountSetPredicate = undefined;
  });

  describe('resolve', () => {
    it('should return IRuleAccountSetPredicate returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRuleAccountSetPredicate = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRuleAccountSetPredicate).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRuleAccountSetPredicate = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRuleAccountSetPredicate).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IRuleAccountSetPredicate>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRuleAccountSetPredicate = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRuleAccountSetPredicate).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
