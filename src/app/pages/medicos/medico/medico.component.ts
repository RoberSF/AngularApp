import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { Router } from '@angular/router';

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
    public router: Router) { }

  ngOnInit() {
    this.hospitalService.getHospitals().subscribe(hospitales => this.hospitales = hospitales)
  }


guardarMedico(form: NgForm) {
  if( form.invalid ) {
    return
  }

  this.medicoService.saveMedico(this.medico).subscribe( medico => {
    console.log(medico);
    this.medico._id = medico._id
    this.router.navigate(['/medico', medico._id])
  })
}

changeHospital(idHospital) {

  this.hospitalService.getHospital( idHospital )
  .subscribe( (hospital:any) => {
    console.log(hospital.hospital);
    this.hospital = hospital.hospital
  });
}



}
