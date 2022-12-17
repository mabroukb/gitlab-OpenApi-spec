import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrivilegeSetDetailComponent } from './privilege-set-detail.component';

describe('PrivilegeSet Management Detail Component', () => {
  let comp: PrivilegeSetDetailComponent;
  let fixture: ComponentFixture<PrivilegeSetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivilegeSetDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ privilegeSet: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PrivilegeSetDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PrivilegeSetDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load privilegeSet on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.privilegeSet).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
