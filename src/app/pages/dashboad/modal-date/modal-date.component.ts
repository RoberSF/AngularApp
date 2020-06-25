import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';
import { DateCita } from 'src/app/models/date.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-date',
  templateUrl: './modal-date.component.html',
  styleUrls: ['./modal-date.component.scss']
})
export class ModalDateComponent implements OnInit {

  idioma: string = 'es' //el idioma por defecto ya es español pero le pongo esto a modo de ejemplo. Controla el pipe en el html
  eventId;

  constructor(public modalService:ModalService, public usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalService.ocultarModalCalendar();
  }


  dateForm(form) {

    if (form.value.nombre != this.usuarioService.usuario.nombre) {

      swal('error');
      return };

    let date = new DateCita (
      form.value.nombre,
      form.value.date,
      form.value.zone,
      form.value.symptoms
    );

    console.log(date)

    this.modalService.searchDate(date)
    .subscribe(resp => {
      
      if( resp.dates.length >= 1 ) {
        swal('Esta cita ya está ocupada')
      } else {
            this.modalService.postCita(date).subscribe(
              response => {
                this.modalService.notificacionNewDate.emit(resp)
              });
      }
    })


  }

  deleteDate() {
    this.modalService.deleteDate(this.modalService.eventId).subscribe( (resp) => {
      swal('Borrada!');
      this.modalService.ocultarModalCalendar();
      this.modalService.notificacionNewDate.emit(resp)
      // location.reload()
    })
  }

}
