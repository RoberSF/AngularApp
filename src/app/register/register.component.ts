import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

form: FormGroup;

  sameFields ( field1:string, field2:string) {
    return ( group: FormGroup) => {

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) {
        return null
      } else {

        return {
          sameFields: true
        };
      };

    };
  }

  constructor(public usuarioService: UsuarioService, 
    public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({ // son todos los campos que quiero controlar por el HTML
      nombre: new FormControl(null, Validators.required), // el primero es el valor por defecto, lo otro son validator que si quiero mas puedo mandar un array 
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false),
    },{validators: this.sameFields('password','password2') });
  }

  postUser() {

    if ( this.form.invalid ) {
      return;
    }
    if ( !this.form.value.conditions ) {

      swal("Important", "You must click the conditions!", "warning");
      alert('Debe seleccionar las condiciones')
    }

    var usuario = new Usuario(
      this.form.value.nombre,
      this.form.value.email,
      this.form.value.password,
    )

    this.usuarioService.postUser(usuario).subscribe(
      response => {
        console.log(response);
        this.router.navigate( ['/login'] )
      });


  }

}
