import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProyectoService } from '../clases/proyecto.service';
import { Proyecto } from '../clases/proyecto';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css'],
  providers: [ProyectoService]
})
export class AddProyectoComponent implements OnInit {
  public proyecto: Proyecto;
  public errorMessage: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proyectoService: ProyectoService
  ) {

  }

  ngOnInit() {
    this.proyecto = new Proyecto();
  }

  onSubmit() {
    this._proyectoService.addProyecto(this.proyecto).subscribe(
      response => {
        this.proyecto = response.proyecto;
        if (!response.proyecto) {
          alert ('Error en el servidor');
        } else {
          this._router.navigate(['/']);
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      }
    );
  }

}
