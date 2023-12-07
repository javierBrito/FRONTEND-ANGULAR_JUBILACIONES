import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JubEstadoTramite } from 'app/auth/models/JubEstadoTramite.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoTramiteService {
  constructor(private http: HttpClient) {
  }

  eliminarEstadoTramitePorId(esttraCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarEstadoTramitePorId/${esttraCodigo}`);
  }
  listarEstadoTramite(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarEstadoTramite`);
  }
  buscarEstadoTramitePorId(esttraCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarEstadoTramitePorCodigo/${esttraCodigo}`);
  }
  guardarEstadoTramite(jubEstadoTramite) {
    return this.http.post<JubEstadoTramite>(`${environment.url_jubilacion}/private/guardarEstadoTramite`, jubEstadoTramite);
  }
}
