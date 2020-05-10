import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  sinceUser = 0;
  totalRegisters: number = 0;


  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsers()
  }


  getUsers() {

    this.usuarioService.getUsers(this.sinceUser).subscribe((data:any) => {

      this.totalRegisters = data.total;
      this.usuarios = data.usuarios
    });
  };

  page(value:number) {
    let since = this.sinceUser + value;

    if( since >= this.totalRegisters) {
      return; //esto quiere decir que se sale
    };

    if ( since < 0 ) {
      return;
    };

    this.sinceUser += value;
    this.getUsers();
  };


}
