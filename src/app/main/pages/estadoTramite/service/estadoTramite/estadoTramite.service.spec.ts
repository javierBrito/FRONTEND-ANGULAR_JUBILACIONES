import { TestBed } from '@angular/core/testing';
import { EstadoTramiteService } from './estadoTramite.service';

describe('EstadoTramiteService', () => {
  let service: EstadoTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoTramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
