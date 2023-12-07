import { MspDiscapacidad } from './../../models/mspDiscapacidad.model';
import { MineducMdtImpedimento } from './../../models/mineducMdtImpedimento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ServicioExterno } from 'app/auth/models/ServicioExterno.model';

@Injectable({
  providedIn: 'root'
})
export class GestionMineducMdtImpedimentoService {

  constructor(private http: HttpClient) { }

  buscarImpedimentoMdtCI(cedula: string): Observable<MineducMdtImpedimento> {
    return this.http.get<MineducMdtImpedimento>(`${environment.url_servicio_externo}/private/buscarPorCedulaDinardap/${cedula}/3839`);
  }
  buscarDiscapacidadMdtCI(cedula: string): Observable<MspDiscapacidad> {
    return this.http.get<MspDiscapacidad>(`${environment.url_servicio_externo}/private/buscarPorCedulaDinardap/${cedula}/646`);
  }
  buscarAportesIessPorCedula(cedula: string): Observable<MspDiscapacidad> {
    return this.http.get<ServicioExterno>(`${environment.url_servicio_externo}/private/buscarPorCedulaDinardap/${cedula}/3844`);
  }
}
