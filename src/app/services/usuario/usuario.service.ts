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

    return this.http.post(_url, usuario);
  }



}
