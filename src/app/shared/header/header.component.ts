import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  usuario: Usuario;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario
  }


  logOut() {
    this.usuarioService.logOut()
  }


  search(value: any) {
    this.router.navigate(['/buscar', value])
  }
}
