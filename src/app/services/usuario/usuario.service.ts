import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UploadFileService } from '../upload-file.service';
import {Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:4000'
  usuario : Usuario;
  token:string;
  menu: any = [];

  constructor(public http: HttpClient, public uploadService: UploadFileService, 
    public route: Router) {
    this.loadStorage(); // para volver a cargar las variables al darle a reload
   }

  reloadToken() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.token
    });

    let url = URL_SERVICIOS + '/login/renuevatoken';

    return this.http.get(url, {headers: headers} ).pipe(
      map( (resp:any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true
      }),
      catchError(err => {
        swal('no fue posible renovar token',err.error.mensaje);
        this.route.navigate(['/login']);
        return throwError(err.error.mensaje);
      })
    )
  }



  postUser(usuario: Usuario) {
    var _url = this.url + '/usuario';

    return this.http.post(_url,usuario).pipe(map(
      (resp:any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError(err => {
        console.log(err.status);
        swal(err.error.errors.message, 'error')
        return throwError(err.error.mensaje);
      }));
  }





  loginGoogle(token: string) {
    let url = this.url + '/login/google';

    return this.http.post(url, { token}).pipe(map((response:any) => {
      this.saveStorage(response.id, response.token, response.usuario, response.menu);
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

    return this.http.post(_url, usuario).pipe(
      map((response:any) => {
        this.saveStorage(response.id, response.token, response.usuario, response.menu);
        return true;
      }),

      catchError(err => {
        console.log(err.status);
        swal(err.error.mensaje)
        return throwError(err.error.mensaje);
      })
      
    )}





saveStorage(id:string, token:string, usuario: Usuario, menu: any) {
  localStorage.setItem('id', id)
  localStorage.setItem('token', token)
  localStorage.setItem('usuario', JSON.stringify(usuario)) // por que viene en la response como un array 
  localStorage.setItem('menu', JSON.stringify(menu)) // por que viene en la response como un array 

  this.usuario = usuario;
  this.token = token;
  this.menu = menu;
}






IsLogged() {
  return (this.token.length > 5? true : false) // esto lo uso en guard , para poder proteger las rutas
}





loadStorage() { // para que las variables se inicien otra vez al darle a recargar 
  if (localStorage.getItem('token')) {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.menu = JSON.parse(localStorage.getItem('menu'))
  } else {
    this.token = '';
    this.usuario = null;
    this.menu = []
  }
}





logOut() {
  this.usuario = null;
  this.token = '';
  this.menu = [];
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('menu');
  window.location.href = '#/login';
}






updateUser(usuario: Usuario) {

  var headers = new HttpHeaders({
    'Content-Type': 'application/json',
     Authorization: this.token
  });

  

  var data = {
    nombre: usuario.nombre,
    email: usuario.email
  }

  let _url = 'http://localhost:4000' + '/usuario/' + usuario._id;


  return this.http.put(_url, data, {headers: headers}).pipe(map((resp:any) => {
    this.usuario = resp.usuario;
    let usuarioDB: Usuario = resp.usuario;
    this.saveStorage(usuarioDB._id, this.token, usuarioDB, this.menu); //por que el storage lo usamos en la app por lo que hay que ponerlo 
    swal('Usuaro Actualizado', usuario.nombre);

    return true
  }));

};







changeImage(file: File, id:string) {
  this.uploadService.uploadFile(file, 'usuarios', id).then( (resp:any) => { // 'usuarios es por la ruta del back
    console.log(resp);
    this.usuario = resp.usuarioActualizado.img;
    swal('Imagen actualizada', this.usuario.nombre)
    this.saveStorage(id, this.token, this.usuario, this.menu)
  }).catch(rej => {
    console.log(rej)
  });
}






getUsers(since:number) {

  let url = URL_SERVICIOS + '/usuario?since=' + since;

  return this.http.get(url);
};






searchUser(value:string) {

  let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + value;

  return this.http.get(url);
};






deleteUser(id: string) {

  var headers = new HttpHeaders({
    'Content-Type': 'application/json',
     Authorization: this.token
  });

  let url = URL_SERVICIOS + '/usuario/' + id ;

  // url += 'token=' + this.token;

  return this.http.delete(url, {headers: headers} )
};






updateRole(usuario: Usuario) {

  var headers = new HttpHeaders({
    'Content-Type': 'application/json',
     Authorization: this.token
  });

  

  var data = {
    nombre: usuario.nombre,
    email: usuario.email,
    role: usuario.role
  }

  let _url = 'http://localhost:4000' + '/usuario/' + usuario._id;


  return this.http.put(_url, data, {headers: headers}).pipe(map((resp:any) => {
    this.usuario = resp.usuario;

    if (usuario._id === this.usuario._id ) { // this.usuario._id es el que está logueado

      let usuarioDB: Usuario = resp.usuario;
      this.saveStorage(usuarioDB._id, this.token, usuarioDB, this.menu); //por que el storage lo usamos en la app por lo que hay que ponerlo 
    }
    swal('Usuaro Actualizado', usuario.nombre);

    return true
  }));

};


}
