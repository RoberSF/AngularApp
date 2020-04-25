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

    let promesa  = new Promise((resolve, reject) => {

      let contador = 0;

      let interval = setInterval(() => {

        contador += 1;
        console.log(contador);

        if (contador === 3) {

          resolve();
          clearInterval(interval)

        }

      }, 1000);

    });

    promesa.then(() => console.log('terminó')).catch(error => console.log('error'))


    }






  ngOnInit() {
  }





}
