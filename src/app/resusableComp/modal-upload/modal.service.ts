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

  notificacionNewDate = new EventEmitter<any>();

  calendarDate;

  eventId;

  nombre;
  date;
  observaciones= '';
  zone = '';
  symptoms = '';
  

  constructor(public usuarioService: UsuarioService, public http: HttpClient) { 
    // console.log('Modal upload ready')
  }

  postCita(formCita) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });  
    
    console.log(formCita)
    return this.http.post('http://localhost:4000/date',formCita, {headers: headers})
    .pipe(map(
      (resp:any) => {
        swal('Cita creada', resp.citas.date, 'success');
        this.ocultarModalCalendar();
        return resp;
      }),
      catchError(err => {
        swal('error');
        return throwError('Error');
      }));
  }

  searchDate(date) {

    let fechaParam = date.date;
    
    return this.http.get(`http://localhost:4000/date/searchDate/${fechaParam}`)
    .pipe(map(
      (resp:any) => {
        this.ocultarModalCalendar();
        return resp;
      })
    )
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
    this.date = '';
    this.eventId = '';
    this.zone = '';
    this.symptoms = '';
  }

  mostrarModal( tipo:string, id: string ) {
    this.oculto = '';
    this.id = id ;
    this.tipo = tipo;
  }

  mostrarModalCalendar(data) {
    this.date = data;
    this.nombre = this.usuarioService.usuario.nombre;
    this.ocultoCalendar = '';
  }
  
  mostrarModalCalendarwithInfo(data) {
    this.date = data.event.start;
    this.nombre = data.event.meta.nombre;
    this.ocultoCalendar = '';
    this.eventId = data.event.meta.id;
    this.zone = data.event.meta.zone;
    this.symptoms = data.event.meta.symptoms
    
  }


  deleteDate(id: string) {

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.usuarioService.token
    });
  
  
    return this.http.delete(`http://localhost:4000/date/${id}`, {headers: headers} )
  };

  // saveCita() {
  //   console.log(this.calendarDate)
  //   console.log(this.date)
  //   console.log(this.nombre)
  // }

}
