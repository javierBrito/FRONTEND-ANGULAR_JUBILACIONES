import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JubTipoDesvinculacion } from 'app/auth/models/JubTipoDesvinculacion.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDesvinculacionService {
  constructor(private http: HttpClient) {
  }

  eliminarTipoDesvinculacionPorId(tipdesCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarTipoDesvinculacionPorId/${tipdesCodigo}`);
  }
  listarTipoDesvinculacion(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarTipoDesvinculacion`);
  }
  buscarTipoDesvinculacionPorId(tipdesCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarTipoDesvinculacionPorCodigo/${tipdesCodigo}`);

  }
  guardarTipoDesvinculacion(tipoDesvinculacion) {
    return this.http.post<JubTipoDesvinculacion>(`${environment.url_jubilacion}/private/guardarTipoDesvinculacion`, tipoDesvinculacion);
  }
}
