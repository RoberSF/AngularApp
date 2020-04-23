import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  porcentaje:number = 50;
  legendProgress:string;

  constructor() { }

  ngOnInit() {
  }

  changeValue(event: number) {
    this.porcentaje = event
  }
}
