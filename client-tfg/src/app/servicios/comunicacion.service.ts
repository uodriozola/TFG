import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HistoriaUsuario } from '../clases/hu';
import { Iteracion } from '../clases/iteracion';

import { TareasService } from './tareas.service';
import { TiposService } from './tipos.service';

@Injectable()
export class ComunicacionService {

  huSel: Subject<HistoriaUsuario> = new Subject<HistoriaUsuario>();
  huDetallesCambio: Subject<HistoriaUsuario> = new Subject<HistoriaUsuario>();
  huDetallesCreado: Subject<HistoriaUsuario> = new Subject<HistoriaUsuario>();
  nuevaIteracion: Subject<Iteracion> = new Subject<Iteracion>();
  detallesIteracion: Subject<Iteracion> = new Subject<Iteracion>();
  eliminaIteracion: Subject<Iteracion> = new Subject<Iteracion>();

  constructor(private tareasService: TareasService,
              private tiposService: TiposService) { }

  // Me sirve para detectar el nodo seleccionado desde el otro componente
  updateNodoSel(hu: HistoriaUsuario) {
    this.huSel.next(hu);
  }

  // Me sirve para detectar los cambios guardados en los detalles del Objetivo de Usuario
  detallesNodoCambio(hu: HistoriaUsuario) {
    this.huDetallesCambio.next(hu);
  }

  // Me sirve para detectar la Hu creada desde detalles y visualizarla en el gráfico
  addHuDetalles(hu: HistoriaUsuario) {
    this.huDetallesCreado.next(hu);
  }

  // Me sirve para saber que se ha clicado en el botón de añadir Iteración
  addIteration() {
    this.nuevaIteracion.next();
  }

  // Me sirve para saber que se ha añadido una nueva Iteración
  detallesIteration(iter: Iteracion) {
    this.detallesIteracion.next(iter);
  }

  // Me sirve para saber que se ha eliminado una iteración
  eliminaIteration(iter: Iteracion) {
    this.eliminaIteracion.next(iter);
  }

  // Devuelve tanto las tareas como el tipo modificado de un OU en función de sus relaciones
  public setValores(nuevoPadre: HistoriaUsuario, hijo: HistoriaUsuario,
    hermanos: HistoriaUsuario[], padres: HistoriaUsuario[],
    descendientes: HistoriaUsuario[], ascendientes: HistoriaUsuario[]): HistoriaUsuario[] {
      let respuesta: HistoriaUsuario[] = [];
      respuesta = this.tiposService.setTipo(nuevoPadre, hijo, hermanos, padres);
      hijo = respuesta[0];
      if (hijo.tipo === 'Division') {
        respuesta.push(hermanos[0]);
        respuesta = respuesta.concat(descendientes);
        respuesta = this.tareasService.setTareas(nuevoPadre, [], respuesta);
      } else if (hijo.tipo === 'Fusion' || hijo.tipo === 'Incremented') {
        ascendientes.push(nuevoPadre);
        respuesta = respuesta.concat(this.tareasService.setTareas(hijo, ascendientes, []));
      }
      return respuesta;
    }

}
