import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';






const pagesRoutes: Routes = [
    {
        path:'', 
        component: PagesComponent,
        children: [
            {path:'dashboard', component: DashboadComponent, data: {title: 'DASHBOARD'}},
            {path:'progress', component: ProgressComponent,  data: {title: 'PROGRESS'}},
            {path:'chart1', component: Chart1Component,  data: {title: 'EXAMPLE CHART'}},
            {path:'promesas', component: PromesasComponent,  data: {title: 'PROMESAS'}},
            {path:'rxjs', component: RxjsComponent,  data: {title: 'EXAMPLE OBSERVABLE'}},
            {path:'account-settings', component: AccountSettingsComponent,  data: {title: 'SETTINGS'}},
            {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },



];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)