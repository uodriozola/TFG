import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validaciones } from '../../validaciones/validaciones';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formulario: FormGroup;
  public errorMessage: any;
  public usuario: Usuario;
  public error: any = null;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
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
    this.usuario = {
      _id: undefined,
      email: this.formulario.value.email,
      username: this.formulario.value.username,
      password: this.formulario.value.password
    };
    this.usuarioService.addUsuario(this.usuario).subscribe(res => {
      if (!res) {
        alert('Error en el servidor');
      } else {
        console.log('Usuario creado correctamente');
        this.activeModal.close(this.usuario);
      }
    },
    error => {
      this.error = 'That username is already in use';
      console.log('Ha ocurrido un error');
    });
  }

}
