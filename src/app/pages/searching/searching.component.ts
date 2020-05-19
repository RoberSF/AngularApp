import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { 

    activatedRoute.params.subscribe(params => {
      let busqueda = params['value'];
      console.log(busqueda)
    })
  }

  ngOnInit() {
  }

}
