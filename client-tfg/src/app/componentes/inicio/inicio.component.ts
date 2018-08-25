import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoService } from '../../servicios/proyecto.service';
import { Proyecto } from '../../clases/proyecto';
import { AddProyectoComponent } from '../add-proyecto/add-proyecto.component';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ProyectoService]
})
export class InicioComponent implements OnInit {
  public proyectos: Proyecto[];
  public errorMessage: any;

  public randomImage = ['Directo.jpg', 'Division.png', 'Fusion.png', 'Incrementado.png', 'Incremento.jpeg', 'Reutilizado.png'];

  public popoverTitle: String = 'Delete proyect';
  public popoverMessage: String = 'Are you sure you want to delete this proyect?';
  public confirmClicked: Boolean = false;
  public cancelClicked: Boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private usuarioService: UsuarioService,
    private _proyectoService: ProyectoService,
    private modalService: NgbModal
  ) {

    this.usuarioService.getUsuario().subscribe(res => {
      console.log(res);
    }, error => {
      this._router.navigateByUrl('portada');
    });

  }

  ngOnInit() {
    this.getProyectos();  // Cojo los proyectos que hay en la base de datos
  }

  getProyectos() {
    this._proyectoService.getProyectos().subscribe(
      result => {
        this.proyectos = result;
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

  crearProyecto() {
    const modalRef = this.modalService.open(AddProyectoComponent);

    modalRef.result.then((result) => {
      this._proyectoService.addProyecto(result).subscribe(response => {
        this.proyectos.push(response);
        if (!response) {
          alert ('Error en el servidor');
        } else {
          console.log('Proyecto creado correctamente');
        }
      });
    }).catch((error) => {
      if (error !== 'Modal cerrado') {
        console.log('Ha ocurrido un error');
      }
    });
}

  randomImagen(): String {
    const num = Math.floor(Math.random() * 6);
     return '../assets/images/' + this.randomImage[num];
  }

  onDeleteProyecto(id) {
    this._proyectoService.deleteProyecto(id).subscribe(
      result => {
        if (!result) {
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
