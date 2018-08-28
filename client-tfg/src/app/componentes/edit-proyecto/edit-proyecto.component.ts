import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProyectoService } from '../../servicios/proyecto.service';
import { Proyecto } from '../../clases/proyecto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css'],
  providers: [ProyectoService]
})
export class EditProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto;

  public formulario: FormGroup;
  public errorMessage: any;
  public username: String;

  constructor(private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    // Se definen los campos del formulario
    this.formulario = this.fb.group({
      nombre: [this.proyecto.nombre, Validators.compose([Validators.required])],
      descripcion: [this.proyecto.descripcion, Validators.compose([Validators.required])],
    });
  }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  onSubmit() {
    this.proyecto = {
      _id: undefined,
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion,
      username: undefined
    };
    this.activeModal.close(this.proyecto);
  }

}
