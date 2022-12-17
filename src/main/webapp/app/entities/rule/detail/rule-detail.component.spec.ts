import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RuleDetailComponent } from './rule-detail.component';

describe('Rule Management Detail Component', () => {
  let comp: RuleDetailComponent;
  let fixture: ComponentFixture<RuleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ rule: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RuleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RuleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load rule on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.rule).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
