import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, filter, switchMap } from 'rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  url = 'http://localhost:4000'
  totalMedicos: number = 0 ;
  constructor(private http: HttpClient, public usuarioService: UsuarioService) { }


  getMedico() {

    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url).pipe(map( (resp:any) => {

      this.totalMedicos = resp.total;
      return resp.medicos;
    }))
  };



  searchMedicos(value: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + value;

    return this.http.get(url);
  };

  deleteMedico(id:string) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });
    
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.delete(url, {headers: headers})
              .pipe(map (resp => {
                swal('Medico Borrado');
              }))
  };



  saveMedico(medico: Medico) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });

    var _url = this.url + '/medico';

    return this.http.post(_url, medico, {headers: headers}).pipe(map( // {nombre} se pone así por que es el unico parametro que está recibiendo
      (resp:any) => {
        swal('Medico creado', 'success');
        return resp.medico;
      }));
  }
}
