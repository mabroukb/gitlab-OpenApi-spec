import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RuleAccountSetPredicateDetailComponent } from './rule-account-set-predicate-detail.component';

describe('RuleAccountSetPredicate Management Detail Component', () => {
  let comp: RuleAccountSetPredicateDetailComponent;
  let fixture: ComponentFixture<RuleAccountSetPredicateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleAccountSetPredicateDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ruleAccountSetPredicate: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RuleAccountSetPredicateDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RuleAccountSetPredicateDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ruleAccountSetPredicate on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ruleAccountSetPredicate).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
