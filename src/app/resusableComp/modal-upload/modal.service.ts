// Es un servicio intermedio que me ayuda a mover datos de un lado a otro


import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  tipo: string;
  id:string;

  oculto: string = 'oculto';

  ocultoCalendar: string = 'oculto'

  notificacion = new EventEmitter<any>();

  calendarDate;


  nombre;
  date;
  onlyDate;
  hour;
  observaciones= '';
  

  constructor(public usuarioService: UsuarioService, public http: HttpClient) { 
    // console.log('Modal upload ready')
  }

  postCita(formCita) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });    

    return this.http.post('http://localhost:4000/date',formCita, {headers: headers})
    .pipe(map(
      (resp:any) => {
        swal('Cita creada', resp.citas.date, 'success');
        return resp;
      }),
      catchError(err => {
        console.log(err.status);
        swal('error');
        return throwError('Error');
      }));
  }

  getDates() {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    }); 
    return this.http.get('http://localhost:4000/date',{headers: headers})
    .pipe(map(
      (resp:any) => {
        return resp.dates;
      }),
      catchError(err => {
        console.log(err.status);
        swal('error');
        return throwError('Error');
      }));

  }

  ocultarModal() {
    
    this.oculto = 'oculto';
    this.id = null ;
    this.tipo = null;
  }
  
  ocultarModalCalendar() {
    this.ocultoCalendar = 'oculto'
  }

  mostrarModal( tipo:string, id: string ) {
    this.oculto = '';
    this.id = id ;
    this.tipo = tipo;
  }

  mostrarModalCalendar(date) {
    this.calendarDate = date; 
    this.date = date;
    this.nombre = this.usuarioService.usuario.nombre;
    this.ocultoCalendar = '';
  }

  // saveCita() {
  //   console.log(this.calendarDate)
  //   console.log(this.date)
  //   console.log(this.nombre)
  // }

}
