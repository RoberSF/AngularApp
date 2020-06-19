import { NgModule } from '@angular/core';
import { DashboadComponent, eventInfoPopUp } from '../pages/dashboad/dashboad.component';
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
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { ModalUploadComponent } from '../resusableComp/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { HospitalService } from '../services/hospital.service';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';
import { SearchingComponent } from './searching/searching.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PhotoClickableComponent } from './photo-clickable/photo-clickable.component'


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { ModalDateComponent } from './dashboad/modal-date/modal-date.component';

registerLocaleData(localeFr);
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    DashboadComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
    IncrementadorComponent,
    ChartDoughnutComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    SearchingComponent,
    eventInfoPopUp,
    DragDropComponent,
    PhotoClickableComponent,
    ModalDateComponent

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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [HospitalService],

  entryComponents: [
    eventInfoPopUp
  ],

})
export class PagesModule { }