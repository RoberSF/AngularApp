import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
    public router: Router) {

  }

  canActivate() {
    if ( this.usuarioService.IsLogged() ) {
      return true
    } else {
      this.router.navigate(['/login'])
      console.log('Bloqueado por el guard');
      return false
    }
  
}

}
