import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GraficoComponent } from './grafico/grafico.component';
import { DetallesComponent } from './detalles/detalles.component';

import { ProyectoService } from './clases/proyecto.service';
import { HuService } from './clases/hu.service';
import { IteracionService } from './clases/iteracion.service';
import { MenubarComponent } from './menubar/menubar.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddProyectoComponent } from './add-proyecto/add-proyecto.component';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { LogicaHuService } from './clases/logica-hu.service';
import { ContadorService } from './clases/contador.service';




@NgModule({
  declarations: [
    AppComponent,
    GraficoComponent,
    DetallesComponent,
    MenubarComponent,
    InicioComponent,
    ProyectoComponent,
    AddProyectoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
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
