import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, filter, switchMap } from 'rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }



  getHospitals() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url).pipe(map( (resp:any) => {

      this.totalHospitales = resp.total;
      return resp.hospitales;
    }))
  };


  getHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this,this.http.get( url).pipe(map( (resp: any) => {
      resp => resp.hospital
    }));
  };


  deleteHospital(id:string) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });
    
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.delete(url, {headers: headers})
              .pipe(map (resp => {
                swal('Usuaro Borrado');
              }))
  };


  postHospital(nombre: string) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });

    var _url = URL_SERVICIOS + '/hospital';

    return this.http.post(_url, {nombre}, {headers: headers}).pipe(map( // {nombre} se pone así por que es el unico parametro que está recibieno
      (resp:any) => {
        swal('Usuario creado', 'success');
        return resp.hospital;
      }));
  };


  searchHospital(value: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + value;

    return this.http.get(url);
  };

  updateHospital(hospital: Hospital) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });

    // var data = {
    //   nombre: usuario.nombre,
    //   email: usuario.email
    // }

    let _url = 'http://localhost:4000' + '/hospital/' + hospital._id;

    return this.http.put(_url, hospital, {headers: headers}).pipe(map((resp:any) => {
      swal('Usuario Actualizado', 'success');
      return resp.hospital;
    }));

  }
}
