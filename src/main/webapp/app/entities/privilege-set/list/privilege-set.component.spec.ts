import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PrivilegeSetService } from '../service/privilege-set.service';

import { PrivilegeSetComponent } from './privilege-set.component';

describe('PrivilegeSet Management Component', () => {
  let comp: PrivilegeSetComponent;
  let fixture: ComponentFixture<PrivilegeSetComponent>;
  let service: PrivilegeSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'privilege-set', component: PrivilegeSetComponent }]), HttpClientTestingModule],
      declarations: [PrivilegeSetComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(PrivilegeSetComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PrivilegeSetComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PrivilegeSetService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.privilegeSets?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to privilegeSetService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPrivilegeSetIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPrivilegeSetIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
