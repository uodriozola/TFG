import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  @Input() public nombreProyecto: String;

  constructor(private router: Router,
              private usuarioService: UsuarioService) {}

  ngOnInit() {
  }

  logout() {
    this.usuarioService.logoutUsuario().subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('portada');
    }, error => {
      console.log(error);
    });
  }

}
