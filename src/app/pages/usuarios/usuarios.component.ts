import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';
import { ModalService } from '../../resusableComp/modal-upload/modal.service';

declare var Swal:any;
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


  constructor(public usuarioService: UsuarioService, public modalService: ModalService) { }

  ngOnInit() {
    this.getUsers();

    this.modalService.notificacion.subscribe(resp => {
      this.getUsers()
    })
  }

  mostrarModal(id:string) {
      this.modalService.mostrarModal('usuarios',id);
      console.log(id)
  }


  getUsers() {

    this.loading = true;

    this.usuarioService.getUsers(this.sinceUser).subscribe((data:any) => {

      this.totalRegisters = data.total;
      this.usuarios = data.usuarios;
      this.loading = false;
      console.log(data)
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
  };

  deleteUser(usuario: Usuario) {
   
    if (usuario._id === this.usuarioService.usuario._id) { //el this.usuarioService.usuario es el usuario que está logueado
      swal('No se puede borrar a si mismo', 'Intentelo con otro usuario');
      return; //importante para que se detenga
    };

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: [true],
      dangerMode: true,
    })
    .then((willDelete) => {
     
      if ( willDelete) {
        this.usuarioService.deleteUser(usuario._id).subscribe(resp=> {
          swal('Usuaro Borrado');
          this.getUsers();
          
        })
      }

    });
  };

  saveUser(usuario: Usuario) {
    this.usuarioService.updateRole(usuario).subscribe(resp => {
      console.log('ok')
    });
  }


}
