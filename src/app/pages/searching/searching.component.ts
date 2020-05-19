import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = []


  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) { 

    activatedRoute.params.subscribe(params => {
      let busqueda = params['value'];
      this.search(busqueda);
    })
  }

  ngOnInit() {
  }


  search(value: any) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + value;


    this.http.get(url).subscribe(
      (resp: any) => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos
      }
    )

  }

}
