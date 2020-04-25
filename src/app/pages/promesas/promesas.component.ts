import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { resolve } from 'url';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.scss']
})
export class PromesasComponent implements OnInit {


  // *********************************Ejemplo Promesa**********************************
  constructor() {
    this.countThree().then(() => console.log('terminó')).catch(error => console.log('error'))
   }


  ngOnInit() {
  }


countThree() { //podría hacer que esta promesa cuando se ejecute me devuelva un boolean, tiene una configuración especial 

  let promesa  = new Promise((resolve, reject) => {

    let contador = 0;

    let interval = setInterval(() => {

      contador += 1;
      console.log(contador);

      if (contador === 3) {

        resolve();
        clearInterval(interval) // si no pongo esto la promesa seguiría sumando 1 sin pararse

      }

    }, 1000);

  });

  

  return promesa;
}


}
