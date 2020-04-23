import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  porcentaje: number = 50;

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
