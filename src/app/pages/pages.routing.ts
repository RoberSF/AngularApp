import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';






const pagesRoutes: Routes = [
    {
        path:'', 
        component: PagesComponent,
        children: [
            {path:'dashboard', component: DashboadComponent},
            {path:'progress', component: ProgressComponent},
            {path:'chart1', component: Chart1Component},
            {path:'account-settings', component: AccountSettingsComponent},
            {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },



];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)