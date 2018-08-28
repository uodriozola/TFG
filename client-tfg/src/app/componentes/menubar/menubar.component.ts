import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, OnDestroy {
  @Input() public nombreProyecto: String;

  subscrip: any;
  public logeado: Boolean = false;

  constructor(private router: Router,
              private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(res => {
      this.logeado = true;
    }, error => {
      this.router.navigateByUrl('portada');
    });
    this.subscrip = this.usuarioService.logeado.subscribe((res) => {
      this.logeado = res;
    });
  }

  ngOnDestroy() {
    this.subscrip.unsubscribe();
  }

  logout() {
    this.usuarioService.logoutUsuario().subscribe(res => {
      this.logeado = false;
      this.router.navigateByUrl('portada');
    }, error => {
      console.log(error);
    });
  }

}
