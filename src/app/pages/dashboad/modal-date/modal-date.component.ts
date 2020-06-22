import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';
import { DateCita } from 'src/app/models/date.model';

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

  // saveCita() {
  //   this.modalService.saveCita();
  // }

  dateForm(form) {
    console.log(form.value);

    let date = new DateCita (
      form.value.nombre,
      form.value.date,
      form.value.observations
    );

    this.modalService.postCita(date).subscribe(
      response => {
        console.log(response) });
  }

}
