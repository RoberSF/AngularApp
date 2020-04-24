import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
              // esto vale para acceder a todo el DOM
  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit() {
  }

changeColor(color:string) {
  console.log(color);

  // cojo la url que se hace referencia en el index.html
  let url = `assets/css/colors/${color}.css`
  // accedo al "id=theme" que está en el index y con set attribute le digo que a ese atributo le ponga el 2º parámetro(url)
  this._document.getElementById('theme').setAttribute('href', url )
}

}
