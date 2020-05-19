import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {

  }

  canActivate() {

    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true
    } else {
      this.usuarioService.logOut();
      console.log('bloqueado')
      this.router.navigate(['/login']);
      return false;

    }
  }
  
}

// esto estaría bien pero no es lo suficientemente seguro por que si conozco los parametros que hay que enviar
// ya podría entrar por postman por ejemplo
