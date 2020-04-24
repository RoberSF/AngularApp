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
@NgModule({
  declarations: [
    DashboadComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
    IncrementadorComponent,
    ChartDoughnutComponent

  ],
  exports: [
    DashboadComponent,
    ProgressComponent,
    Chart1Component,
    PagesComponent,
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]

})
export class PagesModule { }