import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AccountSetDetailComponent } from './account-set-detail.component';

describe('AccountSet Management Detail Component', () => {
  let comp: AccountSetDetailComponent;
  let fixture: ComponentFixture<AccountSetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSetDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ accountSet: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AccountSetDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AccountSetDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load accountSet on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.accountSet).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
