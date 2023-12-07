import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionComponent } from './inscripcion.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: 'inscripcion',
    component: InscripcionComponent,
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
  declarations: [InscripcionComponent]
})
export class InscripcionModule { }
