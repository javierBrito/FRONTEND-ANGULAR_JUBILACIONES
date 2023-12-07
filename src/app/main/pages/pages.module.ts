import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { PrincipalModule } from './principal/principal.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { TipoDesvinculacionModule } from './admin/tipoDesvinculacion/tipoDesvinculacion.module';
import { TipoLeyModule } from './admin/tipoLey/tipoLey.module';
import { TipoJubilacionModule } from './admin/tipoJubilacion/tipoJubilacion.module';
import { TipoDiscapacidadModule } from './admin/tipoDiscapacidad/tipoDiscapacidad.module';
import { ParametroModule } from './admin/parametro/parametro.module';
import { TipoEstadoModule } from './admin/tipoEstado/tipoEstado.module';
import { EstadoTramiteModule } from './estadoTramite/estadoTramite.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    Ng2FlatpickrModule,
    PrincipalModule,
    TipoLeyModule,
    InscripcionModule,
    TipoDesvinculacionModule,
    TipoJubilacionModule,
    TipoDiscapacidadModule,
    ParametroModule,
    TipoEstadoModule,
    EstadoTramiteModule,
  ],

  providers: []
})
export class PagesModule {}
