import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss']
})
export class CreateComponentComponent implements OnInit {

  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    // console.log(this.data)
  }

  onClose() {
    this.close.emit(this.data); // y cierra el componente
  }

}
