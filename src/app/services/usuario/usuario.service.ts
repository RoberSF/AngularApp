import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import { map, filter, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:4000'
  usuario : Usuario;
  token:string;

  constructor(public http: HttpClient) {
    this.loadStorage(); // para volver a cargar las variables al darle a reload
   }



  postUser(usuario: Usuario) {
    var _url = this.url + '/usuario';

    return this.http.post(_url,usuario).pipe(map(
      (resp:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }



  loginGoogle(token: string) {
    let url = this.url + '/login/google';

    return this.http.post(url, { token}).pipe(map((response:any) => {
      this.saveStorage(response.id, response.token, response.usuario);
      return true;
    }))
  }

  login(usuario: Usuario, remember:boolean = false) {
    var _url = this.url + '/login';

    if ( remember = true) {
      localStorage.setItem('email', usuario.email)
    } else {
      localStorage.removeItem('email')
    }

    return this.http.post(_url, usuario).pipe(map(
      (response:any) => {
        this.saveStorage(response.id, response.token, response.usuario);
        return true
      }
    ))
  }

saveStorage(id:string, token:string, usuario: Usuario) {
  localStorage.setItem('id', id)
  localStorage.setItem('token', token)
  localStorage.setItem('usuario', JSON.stringify(usuario)) // por que viene en la response como un array 

  this.usuario = usuario;
  this.token = token;
}


IsLogged() {
  return (this.token.length > 5? true : false) // esto lo uso en guard , para poder proteger las rutas
}

loadStorage() { // para que las variables se inicien otra vez al darle a recargar 
  if (localStorage.getItem('token')) {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
  } else {
    this.token = '';
    this.usuario = null
  }
}


logOut() {
  this.usuario = null;
  this.token = '';
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '#/login';
}

}
