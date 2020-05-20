import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators'


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor() { 

    

    this.returnObservable().pipe(
      retry(2), // le decimos el numero de intentos que quiero que haga. Es decir,busca cada dos intentos
    ).subscribe(
      numero => {
        console.log('subs', numero);
      },
      error => console.log('error'),
      () => console.log('El observador terminó'),
    );
  }

  ngOnInit() {
  }

  returnObservable() { // se puede poner el tipo de observable que yo defina ":Observable<Boolean>..."
  let obs = new Observable(observer => {

    let contador = 0;
    let interval = setInterval ( () => {
      contador ++;
      observer.next(contador); // va a emitir lo que le ponga
      if ( contador ===3 ) {
        // clearInterval(interval); // con esto se para el intervalo, pero no deja de escuchar la promesa
        observer.complete(); // con esto le decimos que ya está todo ok
      } 
      if ( contador === 2) {
        clearInterval(interval);
        observer.error('Help')
      }
    }, 1000);
  });
return obs; // al hacer este cambio puedo pillar la variable desde fuera
// este return lo puedo poner directamente arriba, en vez de let obs => return obs etc
}



}
