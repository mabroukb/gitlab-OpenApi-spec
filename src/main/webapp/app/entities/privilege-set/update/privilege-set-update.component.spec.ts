import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PrivilegeSetFormService } from './privilege-set-form.service';
import { PrivilegeSetService } from '../service/privilege-set.service';
import { IPrivilegeSet } from '../privilege-set.model';

import { PrivilegeSetUpdateComponent } from './privilege-set-update.component';

describe('PrivilegeSet Management Update Component', () => {
  let comp: PrivilegeSetUpdateComponent;
  let fixture: ComponentFixture<PrivilegeSetUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let privilegeSetFormService: PrivilegeSetFormService;
  let privilegeSetService: PrivilegeSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PrivilegeSetUpdateComponent],
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
      .overrideTemplate(PrivilegeSetUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeSetUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    privilegeSetFormService = TestBed.inject(PrivilegeSetFormService);
    privilegeSetService = TestBed.inject(PrivilegeSetService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const privilegeSet: IPrivilegeSet = { id: 456 };

      activatedRoute.data = of({ privilegeSet });
      comp.ngOnInit();

      expect(comp.privilegeSet).toEqual(privilegeSet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrivilegeSet>>();
      const privilegeSet = { id: 123 };
      jest.spyOn(privilegeSetFormService, 'getPrivilegeSet').mockReturnValue(privilegeSet);
      jest.spyOn(privilegeSetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ privilegeSet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: privilegeSet }));
      saveSubject.complete();

      // THEN
      expect(privilegeSetFormService.getPrivilegeSet).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(privilegeSetService.update).toHaveBeenCalledWith(expect.objectContaining(privilegeSet));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrivilegeSet>>();
      const privilegeSet = { id: 123 };
      jest.spyOn(privilegeSetFormService, 'getPrivilegeSet').mockReturnValue({ id: null });
      jest.spyOn(privilegeSetService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ privilegeSet: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: privilegeSet }));
      saveSubject.complete();

      // THEN
      expect(privilegeSetFormService.getPrivilegeSet).toHaveBeenCalled();
      expect(privilegeSetService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPrivilegeSet>>();
      const privilegeSet = { id: 123 };
      jest.spyOn(privilegeSetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ privilegeSet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(privilegeSetService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
