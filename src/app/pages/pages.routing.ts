import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';
import { SearchingComponent } from './searching/searching.component';
import { AdminGuard } from '../services/admin.guard';
import { VerificatokenGuard } from '../services/verificatoken.guard';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { PhotoClickableComponent } from './photo-clickable/photo-clickable.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogReadComponent } from './blog/blog-read/blog-read.component';









const pagesRoutes: Routes = [
    {
        path:'', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard], // puedo usarlo de manra global o componente a componente
        children: [
            {
                path:'dashboard', 
                component: DashboadComponent, 
                canActivate: [VerificatokenGuard],
                data: {title: 'DASHBOARD'},
                
            },
            {path:'progress', component: ProgressComponent,  data: {title: 'PROGRESS'}}, // que es ésta data? 
            {path:'chart1', component: Chart1Component,  data: {title: 'EXAMPLE CHART'}},
            {path:'dragDrop', component: DragDropComponent,  data: {title: 'DRAG'}},
            {path:'account-settings', component: AccountSettingsComponent,  data: {title: 'SETTINGS'}},
            {path:'profile', component: ProfileComponent,  data: {title: 'PERFIL DE USUARIO'}},
            {path:'PhotoClick', component: PhotoClickableComponent,  data: {title: 'PHOTO'}},
            {path:'buscar/:value', component: SearchingComponent,  data: {title: 'BUSCAR'}},
            {path:'blog', component: BlogComponent,  data: {title: 'BLOG'}},
            {path:'blog-post/:id', component: BlogReadComponent,  data: {title: 'BLOG-POST'}}, 
            // {path:'blog-edit', component: BlogEditComponent,  data: {title: 'BLOG-EDIT'}},

            {
                path:'usuarios', 
                component: UsuariosComponent,  
                data: {title: 'USUARIOS'},
                canActivate: [AdminGuard]
            },
            {path:'hospitales', component: HospitalesComponent,  data: {title: 'HOSPITALES'}},
            {path:'medicos', component: MedicosComponent,  data: {title: 'MEDICOS'}},
            {path:'medico/:id', component: MedicoComponent,  data: {title: 'MEDICO'}},
            {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },



];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)