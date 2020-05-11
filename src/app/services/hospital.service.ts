import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  totalHospitales: number = 0;

  constructor(public http: HttpClient) { }



  getHospitals() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url).pipe(map( (resp:any) => {

      this.totalHospitales = resp.total;
      return resp.hospitales;
    }))
  };


  getHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this,this.http.get( url).pipe(map( (resp: any) => {
      resp => resp.hospital
    }));
  }
}
