import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.scss']
})
export class IncrementadorComponent implements OnInit {

 @Input() porcentaje: number = 50;
 @Input() leyenda: string = 'Barra Azul'

//  @Output() changeValue: EventEmitter<number> = new EventEmitter();
// Aquí abajo he cambiado el nombre de la variable changeValue => changedNameOutput
 @Output('changedNameOutput') changeValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickPlus()  {
    if ( this.porcentaje >= 100) {
      this.porcentaje = 100;
    } else {
    this.porcentaje = this.porcentaje + 10
    }
    this.changeValue.emit(this.porcentaje)
  }

  clickMinus() {
    if ( this.porcentaje <= 0 ) {
      this.porcentaje = 0
    } else {
    this.porcentaje = this.porcentaje - 10
    }

    this.changeValue.emit(this.porcentaje)
  }

  onChange(event) {

    let elemetHTML:any = document.getElementsByName('porcentaje')[0];

    if (event >= 100 ) {
      this.porcentaje = 100
    } else if (event <= 0) {
      this.porcentaje = 0
    } else {
      this.porcentaje = event
    }
    elemetHTML.value = this.porcentaje;
    this.changeValue.emit(this.porcentaje)
    }
    
  }


