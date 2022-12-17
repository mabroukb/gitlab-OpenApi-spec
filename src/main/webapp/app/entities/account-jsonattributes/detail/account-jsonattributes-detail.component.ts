import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountJsonattributes } from '../account-jsonattributes.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-account-jsonattributes-detail',
  templateUrl: './account-jsonattributes-detail.component.html',
})
export class AccountJsonattributesDetailComponent implements OnInit {
  accountJsonattributes: IAccountJsonattributes | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountJsonattributes }) => {
      this.accountJsonattributes = accountJsonattributes;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
