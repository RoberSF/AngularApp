import { Routes, RouterModule } from "@angular/router";
import { DashboadComponent } from './pages/dashboad/dashboad.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Chart1Component } from './pages/chart1/chart1.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
    {
        path:'', 
        component: PagesComponent,
        children: [
            {path:'dashboard', component: DashboadComponent},
            {path:'progress', component: ProgressComponent},
            {path:'chart1', component: Chart1Component},
            {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'**', component: NoPageFoundComponent},


];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true})