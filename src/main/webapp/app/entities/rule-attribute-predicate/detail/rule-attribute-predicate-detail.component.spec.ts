import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RuleAttributePredicateDetailComponent } from './rule-attribute-predicate-detail.component';

describe('RuleAttributePredicate Management Detail Component', () => {
  let comp: RuleAttributePredicateDetailComponent;
  let fixture: ComponentFixture<RuleAttributePredicateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleAttributePredicateDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ruleAttributePredicate: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RuleAttributePredicateDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RuleAttributePredicateDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ruleAttributePredicate on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ruleAttributePredicate).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
