import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountSet } from '../account-set.model';

@Component({
  selector: 'jhi-account-set-detail',
  templateUrl: './account-set-detail.component.html',
})
export class AccountSetDetailComponent implements OnInit {
  accountSet: IAccountSet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountSet }) => {
      this.accountSet = accountSet;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
