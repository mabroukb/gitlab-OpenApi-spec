import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AccountSetFormService } from './account-set-form.service';
import { AccountSetService } from '../service/account-set.service';
import { IAccountSet } from '../account-set.model';
import { IAccountSetAssociation } from 'app/entities/account-set-association/account-set-association.model';
import { AccountSetAssociationService } from 'app/entities/account-set-association/service/account-set-association.service';

import { AccountSetUpdateComponent } from './account-set-update.component';

describe('AccountSet Management Update Component', () => {
  let comp: AccountSetUpdateComponent;
  let fixture: ComponentFixture<AccountSetUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accountSetFormService: AccountSetFormService;
  let accountSetService: AccountSetService;
  let accountSetAssociationService: AccountSetAssociationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AccountSetUpdateComponent],
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
      .overrideTemplate(AccountSetUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountSetUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accountSetFormService = TestBed.inject(AccountSetFormService);
    accountSetService = TestBed.inject(AccountSetService);
    accountSetAssociationService = TestBed.inject(AccountSetAssociationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AccountSetAssociation query and add missing value', () => {
      const accountSet: IAccountSet = { id: 456 };
      const accountSetId: IAccountSetAssociation = { id: 92391 };
      accountSet.accountSetId = accountSetId;

      const accountSetAssociationCollection: IAccountSetAssociation[] = [{ id: 52393 }];
      jest.spyOn(accountSetAssociationService, 'query').mockReturnValue(of(new HttpResponse({ body: accountSetAssociationCollection })));
      const additionalAccountSetAssociations = [accountSetId];
      const expectedCollection: IAccountSetAssociation[] = [...additionalAccountSetAssociations, ...accountSetAssociationCollection];
      jest.spyOn(accountSetAssociationService, 'addAccountSetAssociationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountSet });
      comp.ngOnInit();

      expect(accountSetAssociationService.query).toHaveBeenCalled();
      expect(accountSetAssociationService.addAccountSetAssociationToCollectionIfMissing).toHaveBeenCalledWith(
        accountSetAssociationCollection,
        ...additionalAccountSetAssociations.map(expect.objectContaining)
      );
      expect(comp.accountSetAssociationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const accountSet: IAccountSet = { id: 456 };
      const accountSetId: IAccountSetAssociation = { id: 55401 };
      accountSet.accountSetId = accountSetId;

      activatedRoute.data = of({ accountSet });
      comp.ngOnInit();

      expect(comp.accountSetAssociationsSharedCollection).toContain(accountSetId);
      expect(comp.accountSet).toEqual(accountSet);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSet>>();
      const accountSet = { id: 123 };
      jest.spyOn(accountSetFormService, 'getAccountSet').mockReturnValue(accountSet);
      jest.spyOn(accountSetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountSet }));
      saveSubject.complete();

      // THEN
      expect(accountSetFormService.getAccountSet).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accountSetService.update).toHaveBeenCalledWith(expect.objectContaining(accountSet));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSet>>();
      const accountSet = { id: 123 };
      jest.spyOn(accountSetFormService, 'getAccountSet').mockReturnValue({ id: null });
      jest.spyOn(accountSetService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSet: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountSet }));
      saveSubject.complete();

      // THEN
      expect(accountSetFormService.getAccountSet).toHaveBeenCalled();
      expect(accountSetService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountSet>>();
      const accountSet = { id: 123 };
      jest.spyOn(accountSetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountSet });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accountSetService.update).toHaveBeenCalled();
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
  });
});
