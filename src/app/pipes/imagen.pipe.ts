import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS} from '../config/config'

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: string = 'usuario'): any {

    let  url = URL_SERVICIOS + '/img'; // dirección llamada al servicio

    if( !img ) {
      return url + 'usuarios/xxx'; // imagen por defecto que está en el backend
    }

    if ( img.indexOf('https') >=0 ) { 
      return img;
    }

    switch ( type ) {

      case 'usuario':
        return url + '/usuarios/' + img;
      break;

      case 'medico':
        return url + '/medicos/' + img;
      break;

      case 'hospital':
        return url + '/hospitales/' + img;
      break;
      

      default:
        console.log('Tupe of image doesnt exist');
        url + 'usuarios/xxx';
        
    }

    return null;
  }

}
