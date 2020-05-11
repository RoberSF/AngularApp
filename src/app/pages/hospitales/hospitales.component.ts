import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit {



  hospitales: Hospital[] = [];
  constructor(public hospitalService: HospitalService) { 
    this.getHospitales()
  }

  ngOnInit() {
  }

  getHospitales() {
    this.hospitalService.getHospitals().subscribe(hospitales => {
      this.hospitales = hospitales;
    });
  }

  saveHospital(hospital: Hospital) {

  }

  deleteHospital(hospital: Hospital) {

  }

}
