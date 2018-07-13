import { Injectable } from '@angular/core';

@Injectable()
export class ContadorService {

  contador = 0;
  iteraciones = 0;

  constructor() { }

  incrementa() {
    this.contador += 1;
  }

  decrementa() {
    this.contador -= 1;
  }

  inicializa() {
    this.contador = 0;
  }

  incrementaIt() {
    this.iteraciones += 1;
  }

  decrementaIt() {
    this.iteraciones -= 1;
  }

  inicializaIt() {
    this.iteraciones = 0;
  }

}
