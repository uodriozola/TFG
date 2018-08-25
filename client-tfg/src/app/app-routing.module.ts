import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { PortadaComponent } from './componentes/portada/portada.component';

const routes: Routes = [
  { path: 'portada', component: PortadaComponent},
  { path: 'inicio', component: InicioComponent },
  { path: 'proyecto/:id', component: ProyectoComponent },
  { path: 'acercade', component: AcercaDeComponent },
  { path: '', redirectTo: '/portada', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
