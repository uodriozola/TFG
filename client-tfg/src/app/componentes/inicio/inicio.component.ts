import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProyectoService } from '../../servicios/proyecto.service';
import { Proyecto } from '../../clases/proyecto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ProyectoService]
})
export class InicioComponent implements OnInit {
  public proyectos: Proyecto[];
  public errorMessage: any;

  public popoverTitle: String = 'Delete proyect';
  public popoverMessage: String = 'Are you sure you want to delete this proyect?';
  public confirmClicked: Boolean = false;
  public cancelClicked: Boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proyectoService: ProyectoService
  ) {

  }

  ngOnInit() {
    this.getProyectos();  // Cojo los proyectos que hay en la base de datos
  }

  getProyectos() {
    this._proyectoService.getProyectos().subscribe(
      result => {
        this.proyectos = result.proyectos;
        if (!this.proyectos) {
          alert('Error en el servidor');
        }
      },
    error => {
      this.errorMessage = <any>error;
      if (this.errorMessage != null) {
        console.log(this.errorMessage);
      }
    });
  }

  onDeleteProyecto(id) {
    this._proyectoService.deleteProyecto(id).subscribe(
      result => {
        if (!result.proyecto) {
          alert('Error en el servidor');
        }
        this.getProyectos();
      },
    error => {
      this.errorMessage = <any>error;
      if (this.errorMessage != null) {
        console.log(this.errorMessage);
      }
    });
  }

}
