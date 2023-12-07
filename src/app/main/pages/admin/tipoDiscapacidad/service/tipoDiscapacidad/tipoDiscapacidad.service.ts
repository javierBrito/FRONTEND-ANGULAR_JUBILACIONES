import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JubTipoDiscapacidad } from 'app/auth/models/JubTipoDiscapacidad.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDiscapacidadService {
  constructor(private http: HttpClient) {
  }

  eliminarTipoDiscapacidadPorId(tipdisCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarTipoDiscapacidadPorId/${tipdisCodigo}`);
  }
  listarTipoDiscapacidad(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarTipoDiscapacidad`);
  }
  buscarTipoDiscapacidadPorId(tipdisCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarTipoDiscapacidadPorCodigo/${tipdisCodigo}`);

  }
  guardarTipoDiscapacidad(tipoDiscapacidad) {
    return this.http.post<JubTipoDiscapacidad>(`${environment.url_jubilacion}/private/guardarTipoDiscapacidad`, tipoDiscapacidad);
  }
}
