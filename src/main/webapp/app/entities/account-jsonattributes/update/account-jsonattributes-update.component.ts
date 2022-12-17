import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AccountJsonattributesFormService, AccountJsonattributesFormGroup } from './account-jsonattributes-form.service';
import { IAccountJsonattributes } from '../account-jsonattributes.model';
import { AccountJsonattributesService } from '../service/account-jsonattributes.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-account-jsonattributes-update',
  templateUrl: './account-jsonattributes-update.component.html',
})
export class AccountJsonattributesUpdateComponent implements OnInit {
  isSaving = false;
  accountJsonattributes: IAccountJsonattributes | null = null;

  editForm: AccountJsonattributesFormGroup = this.accountJsonattributesFormService.createAccountJsonattributesFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected accountJsonattributesService: AccountJsonattributesService,
    protected accountJsonattributesFormService: AccountJsonattributesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountJsonattributes }) => {
      this.accountJsonattributes = accountJsonattributes;
      if (accountJsonattributes) {
        this.updateForm(accountJsonattributes);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('effOrbacApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountJsonattributes = this.accountJsonattributesFormService.getAccountJsonattributes(this.editForm);
    if (accountJsonattributes.id !== null) {
      this.subscribeToSaveResponse(this.accountJsonattributesService.update(accountJsonattributes));
    } else {
      this.subscribeToSaveResponse(this.accountJsonattributesService.create(accountJsonattributes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountJsonattributes>>): void {
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

  protected updateForm(accountJsonattributes: IAccountJsonattributes): void {
    this.accountJsonattributes = accountJsonattributes;
    this.accountJsonattributesFormService.resetForm(this.editForm, accountJsonattributes);
  }
}
