import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PrivilegeSetFormService, PrivilegeSetFormGroup } from './privilege-set-form.service';
import { IPrivilegeSet } from '../privilege-set.model';
import { PrivilegeSetService } from '../service/privilege-set.service';

@Component({
  selector: 'jhi-privilege-set-update',
  templateUrl: './privilege-set-update.component.html',
})
export class PrivilegeSetUpdateComponent implements OnInit {
  isSaving = false;
  privilegeSet: IPrivilegeSet | null = null;

  editForm: PrivilegeSetFormGroup = this.privilegeSetFormService.createPrivilegeSetFormGroup();

  constructor(
    protected privilegeSetService: PrivilegeSetService,
    protected privilegeSetFormService: PrivilegeSetFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ privilegeSet }) => {
      this.privilegeSet = privilegeSet;
      if (privilegeSet) {
        this.updateForm(privilegeSet);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const privilegeSet = this.privilegeSetFormService.getPrivilegeSet(this.editForm);
    if (privilegeSet.id !== null) {
      this.subscribeToSaveResponse(this.privilegeSetService.update(privilegeSet));
    } else {
      this.subscribeToSaveResponse(this.privilegeSetService.create(privilegeSet));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrivilegeSet>>): void {
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

  protected updateForm(privilegeSet: IPrivilegeSet): void {
    this.privilegeSet = privilegeSet;
    this.privilegeSetFormService.resetForm(this.editForm, privilegeSet);
  }
}
