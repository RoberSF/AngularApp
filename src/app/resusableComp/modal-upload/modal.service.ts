// Es un servicio intermedio que me ayuda a mover datos de un lado a otro


import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

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
  

  constructor() { 
    // console.log('Modal upload ready')
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
    this.ocultoCalendar = '';
  }

  saveCita() {
    console.log(this.calendarDate)
  }

}
