import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarService: SidebarService,
    public usuarioService: UsuarioService) { }

  ngOnInit() {
  }


  logOut() {
    this.usuarioService.logOut();
  }
}
