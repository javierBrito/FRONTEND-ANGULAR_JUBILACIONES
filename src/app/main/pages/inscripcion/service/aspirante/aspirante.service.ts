import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JubAspirante } from 'app/auth/models/JubAspirante';
import { ReporteDTO } from 'app/auth/models/ReporteDTO.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AspiranteService {
  constructor(private http: HttpClient) { }

  eliminarAspirantePorId(aspCodigo: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_jubilacion}/private/eliminarAspirantePorId/${aspCodigo}`);
  }
  listarAspiranteActivo(): Observable<any> | undefined {
    return this.http.get<any[]>(`${environment.url_jubilacion}/private/listarAspiranteActivo`);
  }
  buscarAspirantePorCodigo(aspCodigo: number) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarAspirantePorCodigo/${aspCodigo}`);
  }
  buscarAspirantePorCedula(aspCedula: string) {
    return this.http.get<any>(`${environment.url_jubilacion}/private/buscarAspirantePorCedula/${aspCedula}`);
  }
  guardarAspirante(jubAspirante) {
    return this.http.post<JubAspirante>(`${environment.url_jubilacion}/private/guardarAspirante`, jubAspirante);
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
