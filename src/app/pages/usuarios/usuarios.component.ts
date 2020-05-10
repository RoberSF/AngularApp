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
  loading: boolean = true;


  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsers()
  }


  getUsers() {

    this.loading = true;

    this.usuarioService.getUsers(this.sinceUser).subscribe((data:any) => {

      this.totalRegisters = data.total;
      this.usuarios = data.usuarios;
      this.loading = false
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

  searchUser(value: string) {
    console.log(value);

    this.loading = true;

    if( value.length <= 0 ) { // revisar este error en consola de error 404
      this.getUsers();
    }

    this.usuarioService.searchUser(value)
      .subscribe( (usuarios:any) => {

        console.log(usuarios.usuarios);
        this.usuarios = usuarios.usuarios;
        this.loading = false;
    });
  }


}
