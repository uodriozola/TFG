import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HistoriaUsuario } from '../clases/hu';
import { Tareas } from '../clases/tareas';
import { Iteracion } from '../clases/iteracion';

@Injectable()
export class LogicaHuService {

  huSel: Subject<HistoriaUsuario> = new Subject<HistoriaUsuario>();
  huDetallesCambio: Subject<HistoriaUsuario> = new Subject<HistoriaUsuario>();
  huDetallesCreado: Subject<HistoriaUsuario> = new Subject<HistoriaUsuario>();
  nuevaIteracion: Subject<Iteracion> = new Subject<Iteracion>();
  detallesIteracion: Subject<Iteracion> = new Subject<Iteracion>();
  eliminaIteracion: Subject<Iteracion> = new Subject<Iteracion>();

  constructor() { }

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

  // Decide el tipo de la HU y modifica el del hermano en caso de que sea Warning
  public setTipo(nuevoPadre: HistoriaUsuario, hijo: HistoriaUsuario,
    hermanos: HistoriaUsuario[], padres: HistoriaUsuario[]): HistoriaUsuario[] {
    hijo.padres.push(nuevoPadre._id);
    const res: HistoriaUsuario[] = [];
    if (hijo.padres.length === 0) { // Si no tiene padres es Directo
      hijo.tipo = 'Direct';
    } else if (hijo.padres.length === 1 && hermanos.length === 0) { // Si tiene un padre y no tiene hermanos es Warning
      hijo.tipo = 'Warning';
      // Si tiene más de un padre y ninguna es Increment entonces es Fusión
    } else if (hijo.padres.length > 1 && padres.filter(padre => (padre.tipo === 'Increment')).length === 0 &&
      nuevoPadre.tipo !== 'Increment' && hijo.tipo !== 'Division') {
      hijo.tipo = 'Fusion';
      // Si tiene un padre tipo Incremento y otro que no,  es Incrementado
    } else if ((padres.filter(padre => (padre.tipo === 'Increment')).length > 0 || nuevoPadre.tipo === 'Increment') &&
      (padres.filter(padre => (padre.tipo !== 'Increment')).length > 0 || nuevoPadre.tipo !== 'Increment') && hijo.tipo !== 'Division') {
      hijo.tipo = 'Incremented';
      // Si tiene un padre y tiene hermanos es División
    } else if (hijo.padres.length === 1 && (hermanos.length > 1 || hermanos[0].tipo === 'Warning')) {
      hijo.tipo = 'Division';
      if (hermanos[0].tipo === 'Warning') {
        hermanos[0].tipo = 'Division';
        res.push(hermanos[0]);
      }
    }
    res.unshift(hijo);
    return res;
  }

  // Devuelve la posición de la última tarea realizada
  public ultimaTarea(tareas: Tareas): Number {
    const estado = [tareas.a1, tareas.a2, tareas.a3, tareas.finalizado];
    const verdadero = estado.lastIndexOf(true);
    return verdadero;
  }

  // En función de las tareas realizadas devuelve el color del nodo
  public colorTarea(tareas: Tareas): String {
    if (tareas.finalizado) {
      return '#898584';
    } else if (tareas.a3) {
      return '#C2BDBB';
    } else if (tareas.a2) {
      return '#E2DEDD';
    } else if (tareas.a1) {
      return '#F7EFEE';
    } else {
      return '#FFFFFF';
    }
  }

  // Dado un OU, en función de su tipo, decide las tareas que tienen realizadas sus padres o hijos
  public setTareas(hu: HistoriaUsuario, padres: HistoriaUsuario[], hijos: HistoriaUsuario[]): HistoriaUsuario[] {
    const res: HistoriaUsuario[] = [];
    // Si tiene más de un padre los padres heredan del hijo
    if (padres.length > 1) {
      for (const padre of padres) {
        if (this.ultimaTarea(hu.tareas) > this.ultimaTarea(padre.tareas)) {
          padre.tareas = hu.tareas;
          res.push(padre);
        }
      }
    }
    // Si tiene más de un hijo los hijos heredan del padre
    if (hijos.length > 1) {
      for (const hijo of hijos) {
        if (this.ultimaTarea(hu.tareas) > this.ultimaTarea(hijo.tareas)) {
          hijo.tareas = hu.tareas;
          res.push(hijo);
        }
      }
    }
    return res;
  }

  public esIncremented(padres: HistoriaUsuario[]): Boolean {
    let padreIncremento = false;
    if (padres.length > 1) {
      for (const padre of padres) {
        if (padre.tipo === 'Increment') {
          padreIncremento = true;
          break;
        }
      }
    }
    if (padreIncremento) {
      return true;
    } else {
      return false;
    }
  }

  public esFusion(padres: HistoriaUsuario[]): Boolean {
    let padreIncremento = false;
    if (padres.length > 1) {
      for (const padre of padres) {
        if (padre.tipo === 'Increment') {
          padreIncremento = true;
          break;
        }
      }
    }
    if (padreIncremento) {
      return false;
    } else {
      return true;
    }
  }

  public esDivision(numPadres: Number, hermanos: HistoriaUsuario[]): Boolean {
    if (numPadres === 1 && hermanos.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public esWarning(numPadres: Number, hermanos: HistoriaUsuario[]): Boolean {
    if (numPadres === 1 && hermanos.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  public esIncrement(numPadres: Number): Boolean {
    if (numPadres === 0) {
      return true;
    } else {
      return false;
    }
  }

  public esDirect(numPadres: Number): Boolean {
    if (numPadres === 0) {
      return true;
    } else {
      return false;
    }
  }

  public esReused(numPadres: Number): Boolean {
    if (numPadres === 0) {
      return true;
    } else {
      return false;
    }
  }

}
