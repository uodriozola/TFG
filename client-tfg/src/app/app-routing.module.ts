import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { AddProyectoComponent } from './add-proyecto/add-proyecto.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'proyecto/:id', component: ProyectoComponent },
  { path: 'crear-proyecto', component: AddProyectoComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
