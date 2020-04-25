import { Component, OnInit } from '@angular/core';

declare function init_plugins(); //de esta manera podemos llamar a cualquier script que esté fuera de angular y ponerlo
                                  //en cualquier archivo de JSJ,TS

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
