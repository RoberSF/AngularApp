import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Main Menu',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Dashboard',url: '/dashboard'},
        {title: 'ProgressBar',url: '/progress'},
        {title: 'charts',url: '/chart1'}
      ]
    }
  ]
  constructor() { }
}
