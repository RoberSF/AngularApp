import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularAvanzado';
  constructor ( public SettingsService: SettingsService) {
    //solo con inyectar el servicio ya cargael constructor de settingsService y como es llamado en accountSettings
    // ya se carga
  }
}
