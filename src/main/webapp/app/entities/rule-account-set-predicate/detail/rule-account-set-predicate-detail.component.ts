import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRuleAccountSetPredicate } from '../rule-account-set-predicate.model';

@Component({
  selector: 'jhi-rule-account-set-predicate-detail',
  templateUrl: './rule-account-set-predicate-detail.component.html',
})
export class RuleAccountSetPredicateDetailComponent implements OnInit {
  ruleAccountSetPredicate: IRuleAccountSetPredicate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ruleAccountSetPredicate }) => {
      this.ruleAccountSetPredicate = ruleAccountSetPredicate;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
