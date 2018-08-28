import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RegistroComponent } from '../registro/registro.component';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  public formulario: FormGroup;
  public usuario: Usuario;
  public logeado: Boolean;
  public errorMessage: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private usuarioService: UsuarioService) {
      this.usuario = {
        _id: undefined,
        email: undefined,
        username: undefined,
        password: undefined
      };
    }

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

  onSubmit() {
    Object.assign(this.usuario, this.formulario.value);
    this.usuarioService.loginUsuario(this.usuario).subscribe(res => {
      if (!res) {
        alert('Error en el servidor');
      } else {
        this.logeado = true;
        this.usuarioService.updateUsername(true);
        this.router.navigateByUrl('inicio');
      }
    });
  }

  registrarse() {
    const modalRef = this.modalService.open(RegistroComponent);

    modalRef.result.then((result) => {
      console.log(result);
      this.usuarioService.addUsuario(result).subscribe(res => {
        if (!res) {
          alert('Error en el servidor');
        } else {
          console.log('Usuario creado correctamente');
        }
      });
    }).catch((error) => {
      if (error !== 'Modal cerrado') {
        console.log('Ha ocurrido un error');
      }
    });
  }

}
