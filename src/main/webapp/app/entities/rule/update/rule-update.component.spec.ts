import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RuleFormService } from './rule-form.service';
import { RuleService } from '../service/rule.service';
import { IRule } from '../rule.model';
import { IPrivilegeSet } from 'app/entities/privilege-set/privilege-set.model';
import { PrivilegeSetService } from 'app/entities/privilege-set/service/privilege-set.service';
import { IRuleAccountSetPredicate } from 'app/entities/rule-account-set-predicate/rule-account-set-predicate.model';
import { RuleAccountSetPredicateService } from 'app/entities/rule-account-set-predicate/service/rule-account-set-predicate.service';
import { IRuleAttributePredicate } from 'app/entities/rule-attribute-predicate/rule-attribute-predicate.model';
import { RuleAttributePredicateService } from 'app/entities/rule-attribute-predicate/service/rule-attribute-predicate.service';

import { RuleUpdateComponent } from './rule-update.component';

describe('Rule Management Update Component', () => {
  let comp: RuleUpdateComponent;
  let fixture: ComponentFixture<RuleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ruleFormService: RuleFormService;
  let ruleService: RuleService;
  let privilegeSetService: PrivilegeSetService;
  let ruleAccountSetPredicateService: RuleAccountSetPredicateService;
  let ruleAttributePredicateService: RuleAttributePredicateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RuleUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RuleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RuleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ruleFormService = TestBed.inject(RuleFormService);
    ruleService = TestBed.inject(RuleService);
    privilegeSetService = TestBed.inject(PrivilegeSetService);
    ruleAccountSetPredicateService = TestBed.inject(RuleAccountSetPredicateService);
    ruleAttributePredicateService = TestBed.inject(RuleAttributePredicateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PrivilegeSet query and add missing value', () => {
      const rule: IRule = { id: 456 };
      const ruleId: IPrivilegeSet = { id: 12603 };
      rule.ruleId = ruleId;

      const privilegeSetCollection: IPrivilegeSet[] = [{ id: 58625 }];
      jest.spyOn(privilegeSetService, 'query').mockReturnValue(of(new HttpResponse({ body: privilegeSetCollection })));
      const additionalPrivilegeSets = [ruleId];
      const expectedCollection: IPrivilegeSet[] = [...additionalPrivilegeSets, ...privilegeSetCollection];
      jest.spyOn(privilegeSetService, 'addPrivilegeSetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rule });
      comp.ngOnInit();

      expect(privilegeSetService.query).toHaveBeenCalled();
      expect(privilegeSetService.addPrivilegeSetToCollectionIfMissing).toHaveBeenCalledWith(
        privilegeSetCollection,
        ...additionalPrivilegeSets.map(expect.objectContaining)
      );
      expect(comp.privilegeSetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call RuleAccountSetPredicate query and add missing value', () => {
      const rule: IRule = { id: 456 };
      const ruleId: IRuleAccountSetPredicate = { id: 73716 };
      rule.ruleId = ruleId;

      const ruleAccountSetPredicateCollection: IRuleAccountSetPredicate[] = [{ id: 70100 }];
      jest
        .spyOn(ruleAccountSetPredicateService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: ruleAccountSetPredicateCollection })));
      const additionalRuleAccountSetPredicates = [ruleId];
      const expectedCollection: IRuleAccountSetPredicate[] = [...additionalRuleAccountSetPredicates, ...ruleAccountSetPredicateCollection];
      jest.spyOn(ruleAccountSetPredicateService, 'addRuleAccountSetPredicateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rule });
      comp.ngOnInit();

      expect(ruleAccountSetPredicateService.query).toHaveBeenCalled();
      expect(ruleAccountSetPredicateService.addRuleAccountSetPredicateToCollectionIfMissing).toHaveBeenCalledWith(
        ruleAccountSetPredicateCollection,
        ...additionalRuleAccountSetPredicates.map(expect.objectContaining)
      );
      expect(comp.ruleAccountSetPredicatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call RuleAttributePredicate query and add missing value', () => {
      const rule: IRule = { id: 456 };
      const ruleId: IRuleAttributePredicate = { id: 55161 };
      rule.ruleId = ruleId;

      const ruleAttributePredicateCollection: IRuleAttributePredicate[] = [{ id: 47076 }];
      jest.spyOn(ruleAttributePredicateService, 'query').mockReturnValue(of(new HttpResponse({ body: ruleAttributePredicateCollection })));
      const additionalRuleAttributePredicates = [ruleId];
      const expectedCollection: IRuleAttributePredicate[] = [...additionalRuleAttributePredicates, ...ruleAttributePredicateCollection];
      jest.spyOn(ruleAttributePredicateService, 'addRuleAttributePredicateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rule });
      comp.ngOnInit();

      expect(ruleAttributePredicateService.query).toHaveBeenCalled();
      expect(ruleAttributePredicateService.addRuleAttributePredicateToCollectionIfMissing).toHaveBeenCalledWith(
        ruleAttributePredicateCollection,
        ...additionalRuleAttributePredicates.map(expect.objectContaining)
      );
      expect(comp.ruleAttributePredicatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rule: IRule = { id: 456 };
      const ruleId: IPrivilegeSet = { id: 62212 };
      rule.ruleId = ruleId;
      const ruleId: IRuleAccountSetPredicate = { id: 9829 };
      rule.ruleId = ruleId;
      const ruleId: IRuleAttributePredicate = { id: 48227 };
      rule.ruleId = ruleId;

      activatedRoute.data = of({ rule });
      comp.ngOnInit();

      expect(comp.privilegeSetsSharedCollection).toContain(ruleId);
      expect(comp.ruleAccountSetPredicatesSharedCollection).toContain(ruleId);
      expect(comp.ruleAttributePredicatesSharedCollection).toContain(ruleId);
      expect(comp.rule).toEqual(rule);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRule>>();
      const rule = { id: 123 };
      jest.spyOn(ruleFormService, 'getRule').mockReturnValue(rule);
      jest.spyOn(ruleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rule }));
      saveSubject.complete();

      // THEN
      expect(ruleFormService.getRule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ruleService.update).toHaveBeenCalledWith(expect.objectContaining(rule));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRule>>();
      const rule = { id: 123 };
      jest.spyOn(ruleFormService, 'getRule').mockReturnValue({ id: null });
      jest.spyOn(ruleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rule }));
      saveSubject.complete();

      // THEN
      expect(ruleFormService.getRule).toHaveBeenCalled();
      expect(ruleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRule>>();
      const rule = { id: 123 };
      jest.spyOn(ruleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ruleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePrivilegeSet', () => {
      it('Should forward to privilegeSetService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(privilegeSetService, 'comparePrivilegeSet');
        comp.comparePrivilegeSet(entity, entity2);
        expect(privilegeSetService.comparePrivilegeSet).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRuleAccountSetPredicate', () => {
      it('Should forward to ruleAccountSetPredicateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ruleAccountSetPredicateService, 'compareRuleAccountSetPredicate');
        comp.compareRuleAccountSetPredicate(entity, entity2);
        expect(ruleAccountSetPredicateService.compareRuleAccountSetPredicate).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRuleAttributePredicate', () => {
      it('Should forward to ruleAttributePredicateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ruleAttributePredicateService, 'compareRuleAttributePredicate');
        comp.compareRuleAttributePredicate(entity, entity2);
        expect(ruleAttributePredicateService.compareRuleAttributePredicate).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
