import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AccountJsonattributesFormService } from './account-jsonattributes-form.service';
import { AccountJsonattributesService } from '../service/account-jsonattributes.service';
import { IAccountJsonattributes } from '../account-jsonattributes.model';

import { AccountJsonattributesUpdateComponent } from './account-jsonattributes-update.component';

describe('AccountJsonattributes Management Update Component', () => {
  let comp: AccountJsonattributesUpdateComponent;
  let fixture: ComponentFixture<AccountJsonattributesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accountJsonattributesFormService: AccountJsonattributesFormService;
  let accountJsonattributesService: AccountJsonattributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AccountJsonattributesUpdateComponent],
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
      .overrideTemplate(AccountJsonattributesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountJsonattributesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accountJsonattributesFormService = TestBed.inject(AccountJsonattributesFormService);
    accountJsonattributesService = TestBed.inject(AccountJsonattributesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const accountJsonattributes: IAccountJsonattributes = { id: 456 };

      activatedRoute.data = of({ accountJsonattributes });
      comp.ngOnInit();

      expect(comp.accountJsonattributes).toEqual(accountJsonattributes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountJsonattributes>>();
      const accountJsonattributes = { id: 123 };
      jest.spyOn(accountJsonattributesFormService, 'getAccountJsonattributes').mockReturnValue(accountJsonattributes);
      jest.spyOn(accountJsonattributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountJsonattributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountJsonattributes }));
      saveSubject.complete();

      // THEN
      expect(accountJsonattributesFormService.getAccountJsonattributes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accountJsonattributesService.update).toHaveBeenCalledWith(expect.objectContaining(accountJsonattributes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountJsonattributes>>();
      const accountJsonattributes = { id: 123 };
      jest.spyOn(accountJsonattributesFormService, 'getAccountJsonattributes').mockReturnValue({ id: null });
      jest.spyOn(accountJsonattributesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountJsonattributes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountJsonattributes }));
      saveSubject.complete();

      // THEN
      expect(accountJsonattributesFormService.getAccountJsonattributes).toHaveBeenCalled();
      expect(accountJsonattributesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountJsonattributes>>();
      const accountJsonattributes = { id: 123 };
      jest.spyOn(accountJsonattributesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountJsonattributes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accountJsonattributesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
