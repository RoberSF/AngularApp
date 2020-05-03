import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();//de esta manera podemos llamar a cualquier script que esté fuera de angular y ponerlo
//en cualquier archivo de JSJ,TS

declare const gapi:any; // iniciamos la libreria de google
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  rememeberme = false;

  auth2:any;

  constructor(public router: Router,
    public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.rememeberme = true
    }

    this.googleInit();

  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '912602372070-g2onsbrfbf5m6aijngkv18h45lb1psbp.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });

      this.attachSingIn(document.getElementById('btn-google'));
    })
  }

  attachSingIn(elementHTML) {
    this.auth2.attachClickHandler(elementHTML, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(response => {
        // this.router.navigate(['/dashboard']);
        window.location.href = '#/dashboard' // hago esto por que da un fallo de visualización con la linea 57
      })
      console.log(token);
    })
  }

  logIn(form: NgForm) {
    let usuario: Usuario = new Usuario(null, form.value.email, form.value.password);

    this.usuarioService.login(usuario, form.value.rememberme).subscribe(response => {
      console.log(response);
      this.router.navigate(['/dashboard'])
    })
  }
}
