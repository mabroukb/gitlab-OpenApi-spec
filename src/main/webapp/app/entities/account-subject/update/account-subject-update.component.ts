import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AccountSubjectFormService, AccountSubjectFormGroup } from './account-subject-form.service';
import { IAccountSubject } from '../account-subject.model';
import { AccountSubjectService } from '../service/account-subject.service';
import { IAccountSetAssociation } from 'app/entities/account-set-association/account-set-association.model';
import { AccountSetAssociationService } from 'app/entities/account-set-association/service/account-set-association.service';
import { IAccountJsonattributes } from 'app/entities/account-jsonattributes/account-jsonattributes.model';
import { AccountJsonattributesService } from 'app/entities/account-jsonattributes/service/account-jsonattributes.service';

@Component({
  selector: 'jhi-account-subject-update',
  templateUrl: './account-subject-update.component.html',
})
export class AccountSubjectUpdateComponent implements OnInit {
  isSaving = false;
  accountSubject: IAccountSubject | null = null;

  accountSetAssociationsSharedCollection: IAccountSetAssociation[] = [];
  accountJsonattributesSharedCollection: IAccountJsonattributes[] = [];

  editForm: AccountSubjectFormGroup = this.accountSubjectFormService.createAccountSubjectFormGroup();

  constructor(
    protected accountSubjectService: AccountSubjectService,
    protected accountSubjectFormService: AccountSubjectFormService,
    protected accountSetAssociationService: AccountSetAssociationService,
    protected accountJsonattributesService: AccountJsonattributesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAccountSetAssociation = (o1: IAccountSetAssociation | null, o2: IAccountSetAssociation | null): boolean =>
    this.accountSetAssociationService.compareAccountSetAssociation(o1, o2);

  compareAccountJsonattributes = (o1: IAccountJsonattributes | null, o2: IAccountJsonattributes | null): boolean =>
    this.accountJsonattributesService.compareAccountJsonattributes(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountSubject }) => {
      this.accountSubject = accountSubject;
      if (accountSubject) {
        this.updateForm(accountSubject);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountSubject = this.accountSubjectFormService.getAccountSubject(this.editForm);
    if (accountSubject.id !== null) {
      this.subscribeToSaveResponse(this.accountSubjectService.update(accountSubject));
    } else {
      this.subscribeToSaveResponse(this.accountSubjectService.create(accountSubject));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountSubject>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(accountSubject: IAccountSubject): void {
    this.accountSubject = accountSubject;
    this.accountSubjectFormService.resetForm(this.editForm, accountSubject);

    this.accountSetAssociationsSharedCollection =
      this.accountSetAssociationService.addAccountSetAssociationToCollectionIfMissing<IAccountSetAssociation>(
        this.accountSetAssociationsSharedCollection,
        accountSubject.accountId
      );
    this.accountJsonattributesSharedCollection =
      this.accountJsonattributesService.addAccountJsonattributesToCollectionIfMissing<IAccountJsonattributes>(
        this.accountJsonattributesSharedCollection,
        accountSubject.accountId
      );
  }

  protected loadRelationshipsOptions(): void {
    this.accountSetAssociationService
      .query()
      .pipe(map((res: HttpResponse<IAccountSetAssociation[]>) => res.body ?? []))
      .pipe(
        map((accountSetAssociations: IAccountSetAssociation[]) =>
          this.accountSetAssociationService.addAccountSetAssociationToCollectionIfMissing<IAccountSetAssociation>(
            accountSetAssociations,
            this.accountSubject?.accountId
          )
        )
      )
      .subscribe(
        (accountSetAssociations: IAccountSetAssociation[]) => (this.accountSetAssociationsSharedCollection = accountSetAssociations)
      );

    this.accountJsonattributesService
      .query()
      .pipe(map((res: HttpResponse<IAccountJsonattributes[]>) => res.body ?? []))
      .pipe(
        map((accountJsonattributes: IAccountJsonattributes[]) =>
          this.accountJsonattributesService.addAccountJsonattributesToCollectionIfMissing<IAccountJsonattributes>(
            accountJsonattributes,
            this.accountSubject?.accountId
          )
        )
      )
      .subscribe((accountJsonattributes: IAccountJsonattributes[]) => (this.accountJsonattributesSharedCollection = accountJsonattributes));
  }
}
