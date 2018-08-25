import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  public formulario: FormGroup;

  constructor(private fb: FormBuilder,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    // Se definen los campos del formulario
    this.formulario = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  registrarse() {
    const modalRef = this.modalService.open(RegistroComponent);

    modalRef.result.then((result) => {
      console.log(result);
  });
}

}
