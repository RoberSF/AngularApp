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

  constructor(public http: HttpClient) { }



  postUser(usuario: Usuario) {
    var _url = this.url + '/usuario';

    return this.http.post(_url,usuario).pipe(map(
      (resp:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
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
        localStorage.setItem('id', response.id)
        localStorage.setItem('token', response.token)
        localStorage.setItem('usuario', JSON.stringify(response.id)) // por que viene en la response como un array 

        return true
      }
    ))
  }



}
