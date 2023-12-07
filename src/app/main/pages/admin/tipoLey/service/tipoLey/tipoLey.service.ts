import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JubTipoLey } from 'app/auth/models/JubTipoLey.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoLeyService {
  constructor(private http: HttpClient) {
  }

  eliminarTipoLeyPorId(tipleyCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarTipoLeyPorId/${tipleyCodigo}`);
  }
  listarTipoLey(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarTipoLey`);
  }
  buscarTipoLeyPorId(tipleyCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarTipoLeyPorCodigo/${tipleyCodigo}`);
  }
  guardarTipoLey(jubTipoLey) {
    return this.http.post<JubTipoLey>(`${environment.url_jubilacion}/private/guardarTipoLey`, jubTipoLey);
  }
}
