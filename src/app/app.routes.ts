import { Routes, RouterModule } from "@angular/router";
import { DashboadComponent } from './pages/dashboad/dashboad.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Chart1Component } from './pages/chart1/chart1.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';


const appRoutes: Routes = [
    {path:'dashboard', component: DashboadComponent},
    {path:'login', component: LoginComponent},
    {path:'progress', component: ProgressComponent},
    {path:'chart1', component: Chart1Component},
    {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
    {path:'**', component: NoPageFoundComponent},
    // {path:'register', component: ''},

];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true})