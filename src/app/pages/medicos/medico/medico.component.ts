import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/resusableComp/modal-upload/modal.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {


  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','' , '', ''); // si lo pongo sin comillas me devolvería null
  hospital: Hospital = new Hospital('');

  constructor(public medicoService: MedicosService, public hospitalService: HospitalService,
    public router: Router, public activatedRoute: ActivatedRoute, public modalService: ModalService) {

      this.activatedRoute.params.subscribe(params => { //Esto es para acceder a los parametros de la url 

        let id = params['id'] // como sabemos que es id? por que en el routing.module pusimos "":id"

        if ( id !== 'nuevo') {
          this.cargarMedico(id)
        }
      })
     }

  ngOnInit() {
    this.hospitalService.getHospitals().subscribe(hospitales => this.hospitales = hospitales);

    this.modalService.notificacion.subscribe( resp => {
      this.medico.img = resp.medico.img
    })
  }


guardarMedico(form: NgForm) {
  if( form.invalid ) {
    return
  }

  this.medicoService.saveMedico(this.medico).subscribe( medico => {
    console.log(medico);
    this.medico._id = medico._id
    this.router.navigate(['/medico/', medico._id])
  })
}

changeHospital(idHospital) {

  this.hospitalService.getHospital( idHospital )
  .subscribe( (hospital:any) => {
    console.log(hospital.hospital);
    this.hospital = hospital.hospital
  });
}

cargarMedico(id :string) {
  this.medicoService.cargarMedico(id).subscribe( medico => {
    this.medico = medico ;
    this.medico.hospital = medico.hospital._id;
    this.changeHospital(this.medico.hospital)}) // acordarse que es para cambiar la foto cuando tiene un id 
}

cambiarPhoto() {
  this.modalService.mostrarModal('medicos', this.medico._id)
}

}
