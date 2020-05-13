import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';






const pagesRoutes: Routes = [
    {
        path:'', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard], // puedo usarlo de manra global o componente a componente
        children: [
            {path:'dashboard', component: DashboadComponent, data: {title: 'DASHBOARD'}},
            {path:'progress', component: ProgressComponent,  data: {title: 'PROGRESS'}},
            {path:'chart1', component: Chart1Component,  data: {title: 'EXAMPLE CHART'}},
            {path:'promesas', component: PromesasComponent,  data: {title: 'PROMESAS'}},
            {path:'rxjs', component: RxjsComponent,  data: {title: 'EXAMPLE OBSERVABLE'}},
            {path:'account-settings', component: AccountSettingsComponent,  data: {title: 'SETTINGS'}},
            {path:'profile', component: ProfileComponent,  data: {title: 'PERFIL DE USUARIO'}},


            {path:'usuarios', component: UsuariosComponent,  data: {title: 'USUARIOS'}},
            {path:'hospitales', component: HospitalesComponent,  data: {title: 'HOSPITALES'}},
            {path:'medicos', component: MedicosComponent,  data: {title: 'MEDICOS'}},
            {path:'medico/:id', component: MedicoComponent,  data: {title: 'MEDICO'}},
            {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },



];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)