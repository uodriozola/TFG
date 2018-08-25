import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { GraficoComponent } from './componentes/grafico/grafico.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { MenubarComponent } from './componentes/menubar/menubar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { AddProyectoComponent } from './componentes/add-proyecto/add-proyecto.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { PortadaComponent } from './componentes/portada/portada.component';
import { RegistroComponent } from './componentes/registro/registro.component';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ProyectoService } from './servicios/proyecto.service';
import { HuService } from './servicios/hu.service';
import { IteracionService } from './servicios/iteracion.service';
import { ComunicacionService } from './servicios/comunicacion.service';
import { TareasService } from './servicios/tareas.service';
import { TiposService } from './servicios/tipos.service';
import { ContadorService } from './servicios/contador.service';
import { UsuarioService } from './servicios/usuario.service';




@NgModule({
  declarations: [
    AppComponent,
    GraficoComponent,
    DetallesComponent,
    MenubarComponent,
    InicioComponent,
    ProyectoComponent,
    AddProyectoComponent,
    AcercaDeComponent,
    PortadaComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [HuService,
    ProyectoService,
    IteracionService,
    ComunicacionService,
    TareasService,
    TiposService,
    ContadorService,
    UsuarioService
  ],
  entryComponents: [AddProyectoComponent,
    RegistroComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
