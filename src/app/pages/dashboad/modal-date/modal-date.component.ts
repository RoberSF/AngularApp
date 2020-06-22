import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';

@Component({
  selector: 'app-modal-date',
  templateUrl: './modal-date.component.html',
  styleUrls: ['./modal-date.component.scss']
})
export class ModalDateComponent implements OnInit {

  idioma: string = 'es' //el idioma por defecto ya es español pero le pongo esto a modo de ejemplo. Controla el pipe en el html

  constructor(public modalService:ModalService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalService.ocultarModalCalendar();
  }

  saveCita() {
    this.modalService.saveCita();
  }

  dateForm(form) {
    console.log(form.value)
  }

}
