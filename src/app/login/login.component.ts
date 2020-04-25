import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare function init_plugins();//de esta manera podemos llamar a cualquier script que esté fuera de angular y ponerlo
//en cualquier archivo de JSJ,TS
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  logIn() {
    this.router.navigate(['dashboard'])
  }
}
