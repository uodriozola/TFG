import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProyectoService } from '../clases/proyecto.service';
import { Proyecto } from '../clases/proyecto';

import { HuService } from '../clases/hu.service';
import { HistoriaUsuario } from '../clases/hu';

import { LogicaHuService } from '../clases/logica-hu.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers: [HuService]
})
export class ProyectoComponent implements OnInit {
  public proyecto: Proyecto;
  public hus: HistoriaUsuario[];
  public errorMessage: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proyectoService: ProyectoService,
    private logicaService: LogicaHuService,
    private _huService: HuService,
  ) {

  }

  ngOnInit() {
    this.getProyecto();  // Cojo el proyecto
  }

  getProyecto() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._proyectoService.getProyecto(id).subscribe(
        result => {
          this.proyecto = result.proyecto;
          if (!this.proyecto) {
            this._router.navigate(['/']);
          }
        },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
    });
  }

  addIteration() {
    console.log('Desde el otro');
    this.logicaService.addIteration();
  }

}
