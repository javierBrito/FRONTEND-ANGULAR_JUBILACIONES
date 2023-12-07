import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JubEstadoTramite } from 'app/auth/models/JubEstadoTramite.model';
import { ReporteDTO } from 'app/auth/models/ReporteDTO.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoTramiteService {
  constructor(private http: HttpClient) { }

  eliminarEstadoTramitePorId(esttraCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarEstadoTramitePorId/${esttraCodigo}`);
  }
  listarEstadoTramiteActivo(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarEstadoTramiteActivo`);
  }
  buscarEstadoTramitePorCodigo(esttraCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarEstadoTramitePorCodigo/${esttraCodigo}`);
  }
  buscarEstadoTramitePorCedula(esttraCedula: string) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarEstadoTramitePorCedula/${esttraCedula}`);
  }
  guardarEstadoTramite(jubEstadoTramite) {
    return this.http.post<JubEstadoTramite>(`${environment.url_jubilacion}/private/guardarEstadoTramite`, jubEstadoTramite);
  }
  // Obtener Archivo PDF
  generarArchivoPDF(reporteDTO: ReporteDTO): Observable<HttpEvent<Blob>> {
    return this.http.post(`${environment.url_jubilacion}/private/obtenerReporteInscripcion`, reporteDTO, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
  // Enviar Correo con Archivo PDF
  enviarCorreo(reporteDTO: ReporteDTO): Observable<any> {
    return this.http.post(`${environment.url_jubilacion}/private/enviarCorreo`, reporteDTO);
  }
  // Obtener información de la tabla JUB_EOD
  buscarEodPorCodigo(eodCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarEodPorCodigo/${eodCodigo}`);
  }

}
