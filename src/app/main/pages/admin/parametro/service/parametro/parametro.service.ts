import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JubParametro } from 'app/auth/models/JubParametro.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  constructor(private http: HttpClient) {
  }

  eliminarParametroPorId(parCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarParametroPorId/${parCodigo}`);
  }
  listarParametro(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarParametro`);
  }
  buscarParametroPorId(parCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarParametroPorCodigo/${parCodigo}`);

  }
  guardarParametro(parametro) {
    return this.http.post<JubParametro>(`${environment.url_jubilacion}/private/guardarParametro`, parametro);
  }
}
