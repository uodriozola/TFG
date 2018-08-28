import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProyectoService } from '../../servicios/proyecto.service';
import { Proyecto } from '../../clases/proyecto';
import { HuService } from '../../servicios/hu.service';
import { HistoriaUsuario } from '../../clases/hu';
import { ComunicacionService } from '../../servicios/comunicacion.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { EditProyectoComponent } from '../edit-proyecto/edit-proyecto.component';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
  providers: [HuService]
})
export class ProyectoComponent implements OnInit {
  public proyecto: Proyecto;
  public hus: HistoriaUsuario[];
  public username: String;
  public errorMessage: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private comunicacionService: ComunicacionService,
    private _huService: HuService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(res => {
      this.addUsername(res);
      this.getProyecto();
    }, error => {
      this._router.navigateByUrl('portada');
    });
  }

  addUsername(data) {
    this.username = data._id;
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

  editarProyecto() {
    const modalRef = this.modalService.open(EditProyectoComponent);
    modalRef.componentInstance.proyecto = this.proyecto;
    modalRef.result.then((result) => {
      this.proyecto.nombre = result.nombre;
      this.proyecto.descripcion = result.descripcion;
      this._proyectoService.updateProyecto(this.proyecto._id, this.proyecto).subscribe(response => {
        if (!response) {
          alert ('Error en el servidor');
        } else {
          console.log('Proyecto editado correctamente');
        }
      });
    }).catch((error) => {
      if (error !== 'Modal cerrado') {
        console.log('Ha ocurrido un error');
      }
    });
}

  addIteration() {
    this.comunicacionService.addIteration();
  }

}
