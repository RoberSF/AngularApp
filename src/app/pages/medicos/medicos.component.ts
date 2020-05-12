import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicosService } from '../../services/medicos.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {


  medicos: Medico[] = [];

  constructor(public medicoService: MedicosService) {
    this.loadMedicos();
   }

  ngOnInit() {
  }

  loadMedicos() {
    this.medicoService.getMedico().subscribe((medicos:any) => {
      this.medicos = medicos
    });

  };

  editMedico(medico) {

  };

  deleteMedico(medico) {

  };

  crearMedico() {

  };

  searchMedico() {

  }

}
