import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRule } from '../rule.model';

@Component({
  selector: 'jhi-rule-detail',
  templateUrl: './rule-detail.component.html',
})
export class RuleDetailComponent implements OnInit {
  rule: IRule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rule }) => {
      this.rule = rule;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
