import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RuleAccountSetPredicateFormService } from './rule-account-set-predicate-form.service';
import { RuleAccountSetPredicateService } from '../service/rule-account-set-predicate.service';
import { IRuleAccountSetPredicate } from '../rule-account-set-predicate.model';

import { RuleAccountSetPredicateUpdateComponent } from './rule-account-set-predicate-update.component';

describe('RuleAccountSetPredicate Management Update Component', () => {
  let comp: RuleAccountSetPredicateUpdateComponent;
  let fixture: ComponentFixture<RuleAccountSetPredicateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ruleAccountSetPredicateFormService: RuleAccountSetPredicateFormService;
  let ruleAccountSetPredicateService: RuleAccountSetPredicateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RuleAccountSetPredicateUpdateComponent],
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
      .overrideTemplate(RuleAccountSetPredicateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RuleAccountSetPredicateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ruleAccountSetPredicateFormService = TestBed.inject(RuleAccountSetPredicateFormService);
    ruleAccountSetPredicateService = TestBed.inject(RuleAccountSetPredicateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ruleAccountSetPredicate: IRuleAccountSetPredicate = { id: 456 };

      activatedRoute.data = of({ ruleAccountSetPredicate });
      comp.ngOnInit();

      expect(comp.ruleAccountSetPredicate).toEqual(ruleAccountSetPredicate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRuleAccountSetPredicate>>();
      const ruleAccountSetPredicate = { id: 123 };
      jest.spyOn(ruleAccountSetPredicateFormService, 'getRuleAccountSetPredicate').mockReturnValue(ruleAccountSetPredicate);
      jest.spyOn(ruleAccountSetPredicateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ruleAccountSetPredicate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ruleAccountSetPredicate }));
      saveSubject.complete();

      // THEN
      expect(ruleAccountSetPredicateFormService.getRuleAccountSetPredicate).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ruleAccountSetPredicateService.update).toHaveBeenCalledWith(expect.objectContaining(ruleAccountSetPredicate));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRuleAccountSetPredicate>>();
      const ruleAccountSetPredicate = { id: 123 };
      jest.spyOn(ruleAccountSetPredicateFormService, 'getRuleAccountSetPredicate').mockReturnValue({ id: null });
      jest.spyOn(ruleAccountSetPredicateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ruleAccountSetPredicate: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ruleAccountSetPredicate }));
      saveSubject.complete();

      // THEN
      expect(ruleAccountSetPredicateFormService.getRuleAccountSetPredicate).toHaveBeenCalled();
      expect(ruleAccountSetPredicateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRuleAccountSetPredicate>>();
      const ruleAccountSetPredicate = { id: 123 };
      jest.spyOn(ruleAccountSetPredicateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ruleAccountSetPredicate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ruleAccountSetPredicateService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
