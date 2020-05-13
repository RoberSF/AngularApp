import { NgModule } from '@angular/core';
import { DashboadComponent } from '../pages/dashboad/dashboad.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Chart1Component } from '../pages/chart1/chart1.component';
import { PagesComponent } from '../pages/pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routing';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../resusableComp/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { ChartDoughnutComponent } from '../resusableComp/chart-doughnut/chart-doughnut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { ModalUploadComponent } from '../resusableComp/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { HospitalService } from '../services/hospital.service';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';

@NgModule({
  declarations: [
    DashboadComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
    IncrementadorComponent,
    ChartDoughnutComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent

  ],
  exports: [
    DashboadComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent
    
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    CommonModule,
    PipesModule,
  ],
  providers: [HospitalService],

})
export class PagesModule { }