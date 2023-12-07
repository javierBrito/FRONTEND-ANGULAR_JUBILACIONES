import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.url_seguridades);//colocar aqui las url ha interceptar para enviar cabecera
    const isApiUrlJubilacion = request.url.startsWith(environment.url_docente);
    const isApiUrlRegistroCivil = request.url.startsWith(environment.url_registroCivil);
    const isApiUrlServicioExterno = request.url.startsWith(environment.url_servicio_externo);
    const isApiUrljubilacion = request.url.startsWith(environment.url_jubilacion);
    const isApiUrlCatalogo = request.url.startsWith(environment.url_catalogo);

    if (isLoggedIn && (isApiUrl || isApiUrlJubilacion || isApiUrlRegistroCivil || isApiUrlServicioExterno || isApiUrljubilacion || isApiUrlCatalogo)) {//agregar url a interceptar
      if (this.tokenExpired(currentUser.token)) {
        // token expired
        this._authenticationService.logout();
        this._router.navigate(['/pages/authentication/login-v2']);
      }
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
