import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { AddProyectoComponent } from './componentes/add-proyecto/add-proyecto.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'proyecto/:id', component: ProyectoComponent },
  { path: 'crear-proyecto', component: AddProyectoComponent },
  { path: 'acercade', component: AcercaDeComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
