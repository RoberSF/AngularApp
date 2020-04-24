import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
              // esto vale para acceder a todo el DOM
  constructor(@Inject(DOCUMENT) private _document,
                public SettingsService: SettingsService) {

    this.SettingsService.loadSettings();
    
                 }

  ngOnInit() {
  }

changeColor(theme:string, link: any) {
  console.log(theme);
  this.checkPointer(link);
  // // cojo la url que se hace referencia en el index.html
  // let url = `assets/css/colors/${theme}.css`
  // // accedo al "id=theme" que está en el index y con set attribute le digo que a ese atributo le ponga el 2º parámetro(url)
  // this._document.getElementById('theme').setAttribute('href', url );

  // // pasamos los datos de settings al servicio
  // this.SettingsService.settings.theme = theme;
  // this.SettingsService.settings.themeUrl = url;
  // // guardamos los ajustes en el localstorage
  // this.SettingsService.saveSettings();

  // //hacemos que esto se cargue desde el principio, por tanto, vamos al app.component.ts 
  this.SettingsService.applyTheme(theme);
}

checkPointer(link:any) {

  let selectors:any =  document.getElementsByClassName('selector');
 
  for ( let ref of selectors) {
    ref.classList.remove('working');
    
  }

  // link.classList.add('working')
}

checkAfterLoadTheme() {
  let selectors:any =  document.getElementsByClassName('selector');
  let themeAfterLoad = this.SettingsService.settings.theme

  for ( let ref of selectors) {
    ref.classList.remove('working');
    if (ref.getAttribute('data-theme') === themeAfterLoad ) {
      ref.classList.add('working');
      break; // sale del ciclo for
    }
  }
}

}
