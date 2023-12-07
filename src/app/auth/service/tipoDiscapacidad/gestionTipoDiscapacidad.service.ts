import { Sgd_jub_tipo_discapacidad } from './../../models/sgd_jub_tipo_discapacidad.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionTipoDiscapacidadService {
  

  constructor(private http: HttpClient) { }

  getTipoDiscapacidades(path: string): Observable<Sgd_jub_tipo_discapacidad[]> {
    return this.http.get<Sgd_jub_tipo_discapacidad[]>(path)
  }
}
