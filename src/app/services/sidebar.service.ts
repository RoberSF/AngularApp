import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = []

  // menu: any = [
  //   {
  //     title: 'Main Menu',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       {title: 'Dashboard',url: '/dashboard'},
  //       {title: 'ProgressBar',url: '/progress'},
  //       {title: 'Charts',url: '/chart1'},
  //       {title: 'Promesas',url: '/promesas'},
  //       {title: 'rxjs' ,url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     title: 'Mantenimientos',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {title: 'Usuarios',url: '/usuarios'},
  //       {title: 'Hospitales',url: '/hospitales'},
  //       {title: 'Medicos',url: '/medicos'},
  //     ]
  //   }
  // ]
  constructor(public usuarioService: UsuarioService) {
    
   }

loadMenu() {
  this.menu = this.usuarioService.menu
}
  
}
