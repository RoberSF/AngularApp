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

  crearMedico() {

  };

  searchMedico(value: string) {

    

    if ( value.length <= 0 ) {
      this.loadMedicos() 
      return;
    }

    this.medicoService.searchMedicos(value).subscribe( (medicos:any) => {
      this.medicos = medicos.tabla
    })
  };

  deleteMedico(medico: Medico) {
    this.medicoService.deleteMedico(medico._id).subscribe( () => this.loadMedicos());
  };

}
