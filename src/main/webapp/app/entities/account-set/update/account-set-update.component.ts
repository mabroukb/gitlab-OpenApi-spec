import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AccountSetFormService, AccountSetFormGroup } from './account-set-form.service';
import { IAccountSet } from '../account-set.model';
import { AccountSetService } from '../service/account-set.service';
import { IAccountSetAssociation } from 'app/entities/account-set-association/account-set-association.model';
import { AccountSetAssociationService } from 'app/entities/account-set-association/service/account-set-association.service';

@Component({
  selector: 'jhi-account-set-update',
  templateUrl: './account-set-update.component.html',
})
export class AccountSetUpdateComponent implements OnInit {
  isSaving = false;
  accountSet: IAccountSet | null = null;

  accountSetAssociationsSharedCollection: IAccountSetAssociation[] = [];

  editForm: AccountSetFormGroup = this.accountSetFormService.createAccountSetFormGroup();

  constructor(
    protected accountSetService: AccountSetService,
    protected accountSetFormService: AccountSetFormService,
    protected accountSetAssociationService: AccountSetAssociationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAccountSetAssociation = (o1: IAccountSetAssociation | null, o2: IAccountSetAssociation | null): boolean =>
    this.accountSetAssociationService.compareAccountSetAssociation(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountSet }) => {
      this.accountSet = accountSet;
      if (accountSet) {
        this.updateForm(accountSet);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountSet = this.accountSetFormService.getAccountSet(this.editForm);
    if (accountSet.id !== null) {
      this.subscribeToSaveResponse(this.accountSetService.update(accountSet));
    } else {
      this.subscribeToSaveResponse(this.accountSetService.create(accountSet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountSet>>): void {
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

  protected updateForm(accountSet: IAccountSet): void {
    this.accountSet = accountSet;
    this.accountSetFormService.resetForm(this.editForm, accountSet);

    this.accountSetAssociationsSharedCollection =
      this.accountSetAssociationService.addAccountSetAssociationToCollectionIfMissing<IAccountSetAssociation>(
        this.accountSetAssociationsSharedCollection,
        accountSet.accountSetId
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
            this.accountSet?.accountSetId
          )
        )
      )
      .subscribe(
        (accountSetAssociations: IAccountSetAssociation[]) => (this.accountSetAssociationsSharedCollection = accountSetAssociations)
      );
  }
}
