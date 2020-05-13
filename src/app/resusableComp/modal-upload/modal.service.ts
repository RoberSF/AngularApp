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

  notificacion = new EventEmitter<any>();

  constructor() { 
    console.log('Modal upload ready')
  }



  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null ;
    this.tipo = null;
  }

  mostrarModal( tipo:string, id: string ) {
    this.oculto = '';
    this.id = id ;
    this.tipo = tipo;
  }


}
