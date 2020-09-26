import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, filter, switchMap } from 'rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import swal from 'sweetalert';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  totalPosts: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  getPosts(since:number) {

    let url = URL_SERVICIOS + '/post?since=' + since;
    //console.log(url)

    return this.http.get(url).pipe(map( (resp:any) => {

      this.totalPosts = resp.total;
      return resp.posts;
    }))
  };


  deletePost(id:string) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token // ???
    });
    
    let url = URL_SERVICIOS + '/post/' + id;

    return this.http.delete(url, {headers: headers})
              .pipe(map (resp => {
                swal('Post Borrado');
              }))
  };


  postPost(title: string) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });

    var _url = URL_SERVICIOS + '/post';

    return this.http.post(_url, {title}, {headers: headers}).pipe(map( // {title} se pone así por que es el unico parametro que está recibiendo, en este caso son obligatorios más, asi que tendría que enviarle más parámetros
      (resp:any) => {
        swal('Post creado', 'success');
        return resp.post;
      }));
  };

  searchPost(value: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/blog/' + value;

    return this.http.get(url);
  };

  updatePost(post: Post) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });

    // var data = {
    //   nombre: usuario.nombre,
    //   email: usuario.email
    // }

    let _url = 'http://localhost:4000' + '/hospital/' + post._id;

    return this.http.put(_url, post, {headers: headers}).pipe(map((resp:any) => {
      swal('Post Actualizado', 'success');
      return resp.post;
    }));

  }

  cargarPost(id: string) {

    let url = URL_SERVICIOS + '/post/' + id;

    return this.http.get(url).pipe(map( (resp:any) => {
      return resp.post;
    }))
  };

  
}
