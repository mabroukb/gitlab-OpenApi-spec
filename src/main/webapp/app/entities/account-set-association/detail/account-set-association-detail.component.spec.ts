import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AccountSetAssociationDetailComponent } from './account-set-association-detail.component';

describe('AccountSetAssociation Management Detail Component', () => {
  let comp: AccountSetAssociationDetailComponent;
  let fixture: ComponentFixture<AccountSetAssociationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSetAssociationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ accountSetAssociation: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AccountSetAssociationDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AccountSetAssociationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load accountSetAssociation on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.accountSetAssociation).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
