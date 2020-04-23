import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.scss']
})
export class IncrementadorComponent implements OnInit {

 @Input() porcentaje: number = 50;
 @Input() leyenda: string = 'Barra Azul'


  constructor() { }

  ngOnInit() {
  }

  clickPlus()  {
    if ( this.porcentaje >= 100) {
      this.porcentaje = 100;
    } else {
    this.porcentaje = this.porcentaje + 10
    }
  }

  clickMinus() {
    if ( this.porcentaje <= 0 ) {
      this.porcentaje = 0
    } else {
    this.porcentaje = this.porcentaje - 10
    }
  }

}
