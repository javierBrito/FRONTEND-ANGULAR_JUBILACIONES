import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JubTipoEstado } from 'app/auth/models/JubTipoEstado.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoEstadoService {
  constructor(private http: HttpClient) {
  }

  eliminarTipoEstadoPorId(tipestCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarTipoEstadoPorId/${tipestCodigo}`);
  }
  listarTipoEstado(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarTipoEstado`);
  }
  buscarTipoEstadoPorId(tipestCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarTipoEstadoPorCodigo/${tipestCodigo}`);
  }
  guardarTipoEstado(jubTipoEstado) {
    return this.http.post<JubTipoEstado>(`${environment.url_jubilacion}/private/guardarTipoEstado`, jubTipoEstado);
  }
}
