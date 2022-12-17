import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AccountSetAssociationFormService } from './account-set-association-form.service';
import { AccountSetAssociationService } from '../service/account-set-association.service';
import { IAccountSetAssociation } from '../account-set-association.model';

import { AccountSetAssociationUpdateComponent } from './account-set-association-update.component';

describe('AccountSetAssociation Management Update Component', () => {
  let comp: AccountSetAssociationUpdateComponent;
  let fixture: ComponentFixture<AccountSetAssociationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accountSetAssociationFormService: AccountSetAssociationFormService;
  let accountSetAssociationService: AccountSetAssociationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AccountSetAssociationUpdateComponent],
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
      .overrideTemplate(AccountSetAssociationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountSetAssociationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accountSetAssociationFormService = TestBed.inject(AccountSetAssociationFormService);
    accountSetAssociationService = TestBed.inject(AccountSetAssociationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const accountSetAssociation: IAccountSetAssociation = { id: 456 };

      activatedRoute.data = of({ accountSetAssociation });
      comp.ngOnInit();

      expect(comp.accountSetAssociation).toEqual(accountSetAssociation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSetAssociation>>();
      const accountSetAssociation = { id: 123 };
      jest.spyOn(accountSetAssociationFormService, 'getAccountSetAssociation').mockReturnValue(accountSetAssociation);
      jest.spyOn(accountSetAssociationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSetAssociation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountSetAssociation }));
      saveSubject.complete();

      // THEN
      expect(accountSetAssociationFormService.getAccountSetAssociation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accountSetAssociationService.update).toHaveBeenCalledWith(expect.objectContaining(accountSetAssociation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSetAssociation>>();
      const accountSetAssociation = { id: 123 };
      jest.spyOn(accountSetAssociationFormService, 'getAccountSetAssociation').mockReturnValue({ id: null });
      jest.spyOn(accountSetAssociationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSetAssociation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountSetAssociation }));
      saveSubject.complete();

      // THEN
      expect(accountSetAssociationFormService.getAccountSetAssociation).toHaveBeenCalled();
      expect(accountSetAssociationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSetAssociation>>();
      const accountSetAssociation = { id: 123 };
      jest.spyOn(accountSetAssociationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSetAssociation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accountSetAssociationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
