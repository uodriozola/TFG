import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GraficoComponent } from './componentes/grafico/grafico.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';

import { ProyectoService } from './servicios/proyecto.service';
import { HuService } from './servicios/hu.service';
import { IteracionService } from './servicios/iteracion.service';
import { MenubarComponent } from './componentes/menubar/menubar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddProyectoComponent } from './componentes/add-proyecto/add-proyecto.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { LogicaHuService } from './servicios/logica-hu.service';
import { ContadorService } from './servicios/contador.service';




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
    LogicaHuService,
    ContadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
