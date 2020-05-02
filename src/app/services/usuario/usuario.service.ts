import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:4000'

  constructor(public http: HttpClient) { }



  postUser(usuario: Usuario) {
    var _url = this.url + '/usuario';

    return this.http.post(_url, usuario);
  }




}
