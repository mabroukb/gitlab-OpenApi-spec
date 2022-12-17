import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AccountSetAssociationService } from '../service/account-set-association.service';

import { AccountSetAssociationComponent } from './account-set-association.component';

describe('AccountSetAssociation Management Component', () => {
  let comp: AccountSetAssociationComponent;
  let fixture: ComponentFixture<AccountSetAssociationComponent>;
  let service: AccountSetAssociationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'account-set-association', component: AccountSetAssociationComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [AccountSetAssociationComponent],
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
      .overrideTemplate(AccountSetAssociationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountSetAssociationComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AccountSetAssociationService);

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
    expect(comp.accountSetAssociations?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to accountSetAssociationService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAccountSetAssociationIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAccountSetAssociationIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
