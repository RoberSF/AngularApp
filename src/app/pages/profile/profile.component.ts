import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  usuario: Usuario;

  uploadFile: File;

  imagenTemp: any;

  constructor(public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario; // ya tendría los datos del usuario guardados en el servicio
   }

  ngOnInit() {
  }

  save(usuario: Usuario){
    
    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google) {
    this.usuario.email = usuario.email;
    }
    this.usuarioService.updateUser(this.usuario).subscribe(resp => {
      console.log(resp);
    })

  };


  selectImage(file: File) {

    console.log(file);

    if( !file ) {
      this.uploadFile = null;
      return;
    }

    if ( file.type.indexOf('image') <0 ) {
      swal('Sólo imagenes')
    }

    this.uploadFile = file;


    let reader = new FileReader(); //esto es javascript puro
    let urlImagenTemp =  reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }

  }

  changeImage() {

    // podría disparar la subida desde aquí pero mejor hacerla desde el servicio por que allí tengo el id

    this.usuarioService.changeImage(this.uploadFile, this.usuario._id)
  }
}
