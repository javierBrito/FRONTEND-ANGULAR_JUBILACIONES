import { MvCeduladoMeducacion } from './../../models/mvCeduladoMeducacion.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionMvCeduladoMeducacionService {
  constructor(private http: HttpClient) {
  }

  buscarPorCedula_Des(cedula: string): Observable<MvCeduladoMeducacion> {
    return this.http.get<MvCeduladoMeducacion>(`${environment.url_registroCivil}/private/buscarPorCedula/${cedula}`);
  }

  /*SERVICIOS EXTERNOS*/
  buscarPorCedula(objeto: any): Observable<MvCeduladoMeducacion> {
    return this.http.post<MvCeduladoMeducacion>(`${environment.url_registroCivil}/public/buscarPorCedula`, objeto);
  }
}
