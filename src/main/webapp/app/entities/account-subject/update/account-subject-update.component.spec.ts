import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AccountSubjectFormService } from './account-subject-form.service';
import { AccountSubjectService } from '../service/account-subject.service';
import { IAccountSubject } from '../account-subject.model';
import { IAccountSetAssociation } from 'app/entities/account-set-association/account-set-association.model';
import { AccountSetAssociationService } from 'app/entities/account-set-association/service/account-set-association.service';
import { IAccountJsonattributes } from 'app/entities/account-jsonattributes/account-jsonattributes.model';
import { AccountJsonattributesService } from 'app/entities/account-jsonattributes/service/account-jsonattributes.service';

import { AccountSubjectUpdateComponent } from './account-subject-update.component';

describe('AccountSubject Management Update Component', () => {
  let comp: AccountSubjectUpdateComponent;
  let fixture: ComponentFixture<AccountSubjectUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accountSubjectFormService: AccountSubjectFormService;
  let accountSubjectService: AccountSubjectService;
  let accountSetAssociationService: AccountSetAssociationService;
  let accountJsonattributesService: AccountJsonattributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AccountSubjectUpdateComponent],
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
      .overrideTemplate(AccountSubjectUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountSubjectUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accountSubjectFormService = TestBed.inject(AccountSubjectFormService);
    accountSubjectService = TestBed.inject(AccountSubjectService);
    accountSetAssociationService = TestBed.inject(AccountSetAssociationService);
    accountJsonattributesService = TestBed.inject(AccountJsonattributesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AccountSetAssociation query and add missing value', () => {
      const accountSubject: IAccountSubject = { id: 456 };
      const accountId: IAccountSetAssociation = { id: 56111 };
      accountSubject.accountId = accountId;

      const accountSetAssociationCollection: IAccountSetAssociation[] = [{ id: 5010 }];
      jest.spyOn(accountSetAssociationService, 'query').mockReturnValue(of(new HttpResponse({ body: accountSetAssociationCollection })));
      const additionalAccountSetAssociations = [accountId];
      const expectedCollection: IAccountSetAssociation[] = [...additionalAccountSetAssociations, ...accountSetAssociationCollection];
      jest.spyOn(accountSetAssociationService, 'addAccountSetAssociationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountSubject });
      comp.ngOnInit();

      expect(accountSetAssociationService.query).toHaveBeenCalled();
      expect(accountSetAssociationService.addAccountSetAssociationToCollectionIfMissing).toHaveBeenCalledWith(
        accountSetAssociationCollection,
        ...additionalAccountSetAssociations.map(expect.objectContaining)
      );
      expect(comp.accountSetAssociationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AccountJsonattributes query and add missing value', () => {
      const accountSubject: IAccountSubject = { id: 456 };
      const accountId: IAccountJsonattributes = { id: 99262 };
      accountSubject.accountId = accountId;

      const accountJsonattributesCollection: IAccountJsonattributes[] = [{ id: 25980 }];
      jest.spyOn(accountJsonattributesService, 'query').mockReturnValue(of(new HttpResponse({ body: accountJsonattributesCollection })));
      const additionalAccountJsonattributes = [accountId];
      const expectedCollection: IAccountJsonattributes[] = [...additionalAccountJsonattributes, ...accountJsonattributesCollection];
      jest.spyOn(accountJsonattributesService, 'addAccountJsonattributesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountSubject });
      comp.ngOnInit();

      expect(accountJsonattributesService.query).toHaveBeenCalled();
      expect(accountJsonattributesService.addAccountJsonattributesToCollectionIfMissing).toHaveBeenCalledWith(
        accountJsonattributesCollection,
        ...additionalAccountJsonattributes.map(expect.objectContaining)
      );
      expect(comp.accountJsonattributesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const accountSubject: IAccountSubject = { id: 456 };
      const accountId: IAccountSetAssociation = { id: 1753 };
      accountSubject.accountId = accountId;
      const accountId: IAccountJsonattributes = { id: 5497 };
      accountSubject.accountId = accountId;

      activatedRoute.data = of({ accountSubject });
      comp.ngOnInit();

      expect(comp.accountSetAssociationsSharedCollection).toContain(accountId);
      expect(comp.accountJsonattributesSharedCollection).toContain(accountId);
      expect(comp.accountSubject).toEqual(accountSubject);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSubject>>();
      const accountSubject = { id: 123 };
      jest.spyOn(accountSubjectFormService, 'getAccountSubject').mockReturnValue(accountSubject);
      jest.spyOn(accountSubjectService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSubject });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountSubject }));
      saveSubject.complete();

      // THEN
      expect(accountSubjectFormService.getAccountSubject).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accountSubjectService.update).toHaveBeenCalledWith(expect.objectContaining(accountSubject));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSubject>>();
      const accountSubject = { id: 123 };
      jest.spyOn(accountSubjectFormService, 'getAccountSubject').mockReturnValue({ id: null });
      jest.spyOn(accountSubjectService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSubject: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountSubject }));
      saveSubject.complete();

      // THEN
      expect(accountSubjectFormService.getAccountSubject).toHaveBeenCalled();
      expect(accountSubjectService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSubject>>();
      const accountSubject = { id: 123 };
      jest.spyOn(accountSubjectService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSubject });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accountSubjectService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAccountSetAssociation', () => {
      it('Should forward to accountSetAssociationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(accountSetAssociationService, 'compareAccountSetAssociation');
        comp.compareAccountSetAssociation(entity, entity2);
        expect(accountSetAssociationService.compareAccountSetAssociation).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAccountJsonattributes', () => {
      it('Should forward to accountJsonattributesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(accountJsonattributesService, 'compareAccountJsonattributes');
        comp.compareAccountJsonattributes(entity, entity2);
        expect(accountJsonattributesService.compareAccountJsonattributes).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
