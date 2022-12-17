import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AccountSubjectDetailComponent } from './account-subject-detail.component';

describe('AccountSubject Management Detail Component', () => {
  let comp: AccountSubjectDetailComponent;
  let fixture: ComponentFixture<AccountSubjectDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSubjectDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ accountSubject: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AccountSubjectDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AccountSubjectDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load accountSubject on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.accountSubject).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
