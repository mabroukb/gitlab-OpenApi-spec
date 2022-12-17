import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountSetAssociation } from '../account-set-association.model';

@Component({
  selector: 'jhi-account-set-association-detail',
  templateUrl: './account-set-association-detail.component.html',
})
export class AccountSetAssociationDetailComponent implements OnInit {
  accountSetAssociation: IAccountSetAssociation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountSetAssociation }) => {
      this.accountSetAssociation = accountSetAssociation;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
