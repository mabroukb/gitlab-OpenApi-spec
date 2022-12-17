import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRuleAttributePredicate } from '../rule-attribute-predicate.model';

@Component({
  selector: 'jhi-rule-attribute-predicate-detail',
  templateUrl: './rule-attribute-predicate-detail.component.html',
})
export class RuleAttributePredicateDetailComponent implements OnInit {
  ruleAttributePredicate: IRuleAttributePredicate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ruleAttributePredicate }) => {
      this.ruleAttributePredicate = ruleAttributePredicate;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
