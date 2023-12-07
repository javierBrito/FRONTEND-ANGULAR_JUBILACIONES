import { IgTbFactNomina } from './../../models/igTbFactNomina.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionIgTbFactNominaService {

  constructor(private http: HttpClient) { }

  buscarNominaPorCI(cedula: string): Observable<IgTbFactNomina> {
    return this.http.get<IgTbFactNomina>(`${environment.url_docente}/private/buscarNominaPorCedula/${cedula}`);
  }
}
