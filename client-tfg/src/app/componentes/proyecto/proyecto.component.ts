import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProyectoService } from '../../servicios/proyecto.service';
import { Proyecto } from '../../clases/proyecto';

import { HuService } from '../../servicios/hu.service';
import { HistoriaUsuario } from '../../clases/hu';

import { ComunicacionService } from '../../servicios/comunicacion.service';

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
    private comunicacionService: ComunicacionService,
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
          this.proyecto = result;
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
    this.comunicacionService.addIteration();
  }

}
