import { Component, OnInit } from '@angular/core';
import { HistoriaUsuario } from './clases/hu'; // importo la clase HistoriaUsuario
import { HuService } from './clases/hu.service'; // importo el servicio HuService
import { GraficoComponent } from '../app/grafico/grafico.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto';

  constructor(private huService: HuService) {

  }

  ngOnInit() {

  }

}
