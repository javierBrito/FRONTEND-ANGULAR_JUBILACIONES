import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JubTipoJubilacion } from 'app/auth/models/JubTipoJubilacion.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoJubilacionService {
  constructor(private http: HttpClient) {
  }

  eliminarTipoJubilacionPorId(tipjubCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarTipoJubilacionPorId/${tipjubCodigo}`);
  }
  listarTipoJubilacion(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarTipoJubilacion`);
  }
  buscarTipoJubilacionPorId(tipjubCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarTipoJubilacionPorCodigo/${tipjubCodigo}`);

  }
  guardarTipoJubilacion(tipoJubilacion) {
    return this.http.post<JubTipoJubilacion>(`${environment.url_jubilacion}/private/guardarTipoJubilacion`, tipoJubilacion);
  }
}
