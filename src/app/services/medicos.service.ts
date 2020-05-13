import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, filter, switchMap } from 'rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {


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
}
