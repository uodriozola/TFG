import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Validaciones } from '../../validaciones/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formulario: FormGroup;

  public errorMessage: any;

  constructor(private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    // Se definen los campos del formulario
    this.formulario = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      repeat: ['', Validators.compose([Validators.required])]
    });
    this.formulario.setValidators([Validaciones.camposIguales('password', 'repeat')]);
  }

  cerrarModal() {
    this.activeModal.dismiss('Modal cerrado');
  }

  onSubmit() {
    this.activeModal.close(this.formulario.value);
  }

}
