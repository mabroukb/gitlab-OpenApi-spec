import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RuleAttributePredicateFormService } from './rule-attribute-predicate-form.service';
import { RuleAttributePredicateService } from '../service/rule-attribute-predicate.service';
import { IRuleAttributePredicate } from '../rule-attribute-predicate.model';

import { RuleAttributePredicateUpdateComponent } from './rule-attribute-predicate-update.component';

describe('RuleAttributePredicate Management Update Component', () => {
  let comp: RuleAttributePredicateUpdateComponent;
  let fixture: ComponentFixture<RuleAttributePredicateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ruleAttributePredicateFormService: RuleAttributePredicateFormService;
  let ruleAttributePredicateService: RuleAttributePredicateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RuleAttributePredicateUpdateComponent],
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
      .overrideTemplate(RuleAttributePredicateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RuleAttributePredicateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ruleAttributePredicateFormService = TestBed.inject(RuleAttributePredicateFormService);
    ruleAttributePredicateService = TestBed.inject(RuleAttributePredicateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ruleAttributePredicate: IRuleAttributePredicate = { id: 456 };

      activatedRoute.data = of({ ruleAttributePredicate });
      comp.ngOnInit();

      expect(comp.ruleAttributePredicate).toEqual(ruleAttributePredicate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRuleAttributePredicate>>();
      const ruleAttributePredicate = { id: 123 };
      jest.spyOn(ruleAttributePredicateFormService, 'getRuleAttributePredicate').mockReturnValue(ruleAttributePredicate);
      jest.spyOn(ruleAttributePredicateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ruleAttributePredicate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ruleAttributePredicate }));
      saveSubject.complete();

      // THEN
      expect(ruleAttributePredicateFormService.getRuleAttributePredicate).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ruleAttributePredicateService.update).toHaveBeenCalledWith(expect.objectContaining(ruleAttributePredicate));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRuleAttributePredicate>>();
      const ruleAttributePredicate = { id: 123 };
      jest.spyOn(ruleAttributePredicateFormService, 'getRuleAttributePredicate').mockReturnValue({ id: null });
      jest.spyOn(ruleAttributePredicateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ruleAttributePredicate: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ruleAttributePredicate }));
      saveSubject.complete();

      // THEN
      expect(ruleAttributePredicateFormService.getRuleAttributePredicate).toHaveBeenCalled();
      expect(ruleAttributePredicateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRuleAttributePredicate>>();
      const ruleAttributePredicate = { id: 123 };
      jest.spyOn(ruleAttributePredicateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ruleAttributePredicate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ruleAttributePredicateService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
