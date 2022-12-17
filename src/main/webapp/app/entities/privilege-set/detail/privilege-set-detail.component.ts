import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrivilegeSet } from '../privilege-set.model';

@Component({
  selector: 'jhi-privilege-set-detail',
  templateUrl: './privilege-set-detail.component.html',
})
export class PrivilegeSetDetailComponent implements OnInit {
  privilegeSet: IPrivilegeSet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ privilegeSet }) => {
      this.privilegeSet = privilegeSet;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
