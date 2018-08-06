import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { ProyectoService } from '../../servicios/proyecto.service';
import { Proyecto } from '../../clases/proyecto';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css'],
  providers: [ProyectoService]
})
export class AddProyectoComponent implements OnInit {

  public formulario: FormGroup;

  public proyecto: Proyecto;
  public errorMessage: any;

  constructor(private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _proyectoService: ProyectoService
  ) {

  }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    // Se definen los campos del formulario
    this.formulario = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    this.proyecto = {
      _id: undefined,
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion
    };
    this._proyectoService.addProyecto(this.proyecto).subscribe(
      response => {
        this.proyecto = response;
        if (!response) {
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
