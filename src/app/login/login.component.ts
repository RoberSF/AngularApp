import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();//de esta manera podemos llamar a cualquier script que esté fuera de angular y ponerlo
//en cualquier archivo de JSJ,TS
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  rememeberme = false;


  constructor(public router: Router,
    public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.rememeberme = true
    }
  }

  logIn(form: NgForm) {
    let usuario: Usuario = new Usuario(null, form.value.email, form.value.password);

    this.usuarioService.login(usuario, form.value.rememberme).subscribe(response => {
      console.log(response);
      this.router.navigate(['/dashboard'])
    })
    // this.router.navigate(['dashboard'])
  }
}
