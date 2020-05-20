import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificatokenGuard implements CanActivate {


constructor( public usuarioService: UsuarioService, public route: Router) {

}

  canActivate():  Promise<boolean> | boolean{ // devuelve dos opciones un boolean(que tengo con el if) 
                                              // y el resultado de una promesa

    let token = this.usuarioService.token;

    let payload = JSON.parse( atob(token.split('.')[1] ) ); // con el split dividimos el token cada vez que encuentre un .

    let expiratedToken = this.expiratedToken(payload.exp); // con esto tengo una una respuesta true o false que me dice si está expirada o no

    if ( expiratedToken ) {
      this.route.navigate(['/login']);
      return false;
    } 



    return this.verificaReloadToken( payload.exp);
  }



  verificaReloadToken(expirationDate: number): Promise<boolean> {
    
    return new Promise( (resolve, reject) => {


      let tokenExp = new Date(expirationDate * 1000 ); // por que necesito milisegundos para poder comparar
      let now = new Date();

      now.setTime(now.getTime() + (4*60*60*1000) );

      if ( tokenExp.getTime() > now.getTime() ) {
        resolve(true);

      } else {

        this.usuarioService.reloadToken().subscribe( (resp) => {
          resolve(true);
        }), () => { reject(false); this.route.navigate(['/login'])}
      }

    })
  }




expiratedToken(expirationDate: number) {

  let now = new Date().getTime() / 1000;

  if (expirationDate < now ) {
    return true; // quiero decir con el true que está expirado
  } else {
    return false;
  }
}

  
}
