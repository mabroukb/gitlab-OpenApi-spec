import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AccountSetAssociationFormService, AccountSetAssociationFormGroup } from './account-set-association-form.service';
import { IAccountSetAssociation } from '../account-set-association.model';
import { AccountSetAssociationService } from '../service/account-set-association.service';

@Component({
  selector: 'jhi-account-set-association-update',
  templateUrl: './account-set-association-update.component.html',
})
export class AccountSetAssociationUpdateComponent implements OnInit {
  isSaving = false;
  accountSetAssociation: IAccountSetAssociation | null = null;

  editForm: AccountSetAssociationFormGroup = this.accountSetAssociationFormService.createAccountSetAssociationFormGroup();

  constructor(
    protected accountSetAssociationService: AccountSetAssociationService,
    protected accountSetAssociationFormService: AccountSetAssociationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountSetAssociation }) => {
      this.accountSetAssociation = accountSetAssociation;
      if (accountSetAssociation) {
        this.updateForm(accountSetAssociation);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountSetAssociation = this.accountSetAssociationFormService.getAccountSetAssociation(this.editForm);
    if (accountSetAssociation.id !== null) {
      this.subscribeToSaveResponse(this.accountSetAssociationService.update(accountSetAssociation));
    } else {
      this.subscribeToSaveResponse(this.accountSetAssociationService.create(accountSetAssociation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountSetAssociation>>): void {
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

  protected updateForm(accountSetAssociation: IAccountSetAssociation): void {
    this.accountSetAssociation = accountSetAssociation;
    this.accountSetAssociationFormService.resetForm(this.editForm, accountSetAssociation);
  }
}
