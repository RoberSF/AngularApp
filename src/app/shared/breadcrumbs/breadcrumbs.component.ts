import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {


  title:string;
  constructor(private router: Router) { 
    
    
    this.getDataRoute().subscribe( data => {
      console.log(event),
      this.title = data.title
    });
  }

  ngOnInit() {
  }

  getDataRoute() {

     return this.router.events.pipe(
      filter(evento =>  evento instanceof ActivationEnd), // va filtrando los datos que recibo
      filter((evento: ActivationEnd)  => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data) //accede al objeto y le digo que es lo que quiero de el, en vez de recibir todo


    )
  }

}
