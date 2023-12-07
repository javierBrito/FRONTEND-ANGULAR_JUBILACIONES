import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TipoEstadoComponent } from './tipoEstado.component';

const routes: Routes = [
  {
    path: 'tipoEstado',
    component: TipoEstadoComponent,
    //canActivate: [AuthGuard],

  }
];

@NgModule({
  declarations: [TipoEstadoComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    CoreCommonModule, 
    ContentHeaderModule, 
    NgxPaginationModule],
})
export class TipoEstadoModule { }
