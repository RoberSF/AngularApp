import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';
import swal from 'sweetalert';
import { ModalService } from '../../resusableComp/modal-upload/modal.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit {



  hospitales: Hospital[] = [];
  constructor(public hospitalService: HospitalService, public modalService: ModalService) {
    this.getHospitales();
  }

  ngOnInit() {
    this.modalService.notificacion.subscribe(() => this.getHospitales());
  }

  getHospitales() {
    this.hospitalService.getHospitals().subscribe(hospitales => {
      this.hospitales = hospitales;
    });
  }

  saveHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital).subscribe();
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id).subscribe( () => this.getHospitales());
  }

  searchHospital(value: string) {

    if ( value.length <= 0 ) {
      this.getHospitales();
      return;
    }

    this.hospitalService.searchHospital(value).subscribe( (hospitales: any) => {
      this.hospitales = hospitales.tabla;
      console.log(this.hospitales);
    });
  }

  crearHospital() {

    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hopsital',
      content: {
        element: 'input'
     },
      icon: 'info',
      buttons: [true],
      dangerMode: true
    }).then((valor: string) => {

     if (!valor || valor.length === 0 ) {
      return;
    }

     this.hospitalService.postHospital(valor).subscribe( () => { this.getHospitales(); });
  });

}
actualizarImagen(hospitalID) {
  this.modalService.mostrarModal('hospitales', hospitalID);
}



}
