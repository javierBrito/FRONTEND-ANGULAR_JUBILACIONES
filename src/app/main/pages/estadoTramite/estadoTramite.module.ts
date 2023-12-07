import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EstadoTramiteComponent } from './estadoTramite.component';

const routes: Routes = [
  {
    path: 'estadoTramite',
    component: EstadoTramiteComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    CoreCommonModule, 
    ContentHeaderModule, 
    NgxPaginationModule
  ],
  declarations: [EstadoTramiteComponent]
})
export class EstadoTramiteModule { }
