import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountSubject } from '../account-subject.model';

@Component({
  selector: 'jhi-account-subject-detail',
  templateUrl: './account-subject-detail.component.html',
})
export class AccountSubjectDetailComponent implements OnInit {
  accountSubject: IAccountSubject | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountSubject }) => {
      this.accountSubject = accountSubject;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
