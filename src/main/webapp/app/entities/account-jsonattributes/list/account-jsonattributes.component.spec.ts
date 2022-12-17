import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AccountJsonattributesService } from '../service/account-jsonattributes.service';

import { AccountJsonattributesComponent } from './account-jsonattributes.component';

describe('AccountJsonattributes Management Component', () => {
  let comp: AccountJsonattributesComponent;
  let fixture: ComponentFixture<AccountJsonattributesComponent>;
  let service: AccountJsonattributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'account-jsonattributes', component: AccountJsonattributesComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [AccountJsonattributesComponent],
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
      .overrideTemplate(AccountJsonattributesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountJsonattributesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AccountJsonattributesService);

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
    expect(comp.accountJsonattributes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to accountJsonattributesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAccountJsonattributesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAccountJsonattributesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
