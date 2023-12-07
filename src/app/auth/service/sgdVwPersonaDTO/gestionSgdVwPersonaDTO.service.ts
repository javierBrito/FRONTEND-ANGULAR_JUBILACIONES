import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SgdVwPersonaDTO } from './../../models/sgdVwPersonaDTO';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CatDistrito } from 'app/auth/models/CatDistrito.model';
import { CatZona } from 'app/auth/models/CatZona.model';


@Injectable({
  providedIn: 'root'
})
export class GestionSgdVwPersonaDTOService {

  constructor(private http: HttpClient) { }

  // Buscar Docente por Cédula
  buscarPorCedulaDocente(cedula: string): Observable<SgdVwPersonaDTO> {
    return this.http.get<SgdVwPersonaDTO>(`${environment.url_docente}/private/buscarPorCedulaDocente/${cedula}`);
  }

  // Listar distrito 
  listarDistrito(): Observable<CatDistrito[]> {
    return this.http.get<CatDistrito[]>(`${environment.url_catalogo}/private/listarCatalogoDistritos`);
  }
  // Listar zona 
  listarZona(): Observable<CatZona[]> {
    return this.http.get<CatZona[]>(`${environment.url_catalogo}/private/listarZonas`);
  }}
