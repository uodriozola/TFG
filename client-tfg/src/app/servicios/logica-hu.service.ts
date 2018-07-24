import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HistoriaUsuario } from '../clases/hu';

@Injectable()
export class LogicaHuService {

  huSel: Subject<String> = new Subject<String>();
  huDetallesCambio: Subject<String> = new Subject<String>();
  huDetallesCreado: Subject<String> = new Subject<String>();
  nuevaIteracion: Subject<String> = new Subject<String>();
  detallesIteracion: Subject<String> = new Subject<String>();
  eliminaIteracion: Subject<String> = new Subject<String>();

  constructor() { }

  // Me sirve para detectar el nodo seleccionado desde el otro componente
  updateNodoSel(huID: String) {
    this.huSel.next(huID);
  }

  // Me sirve para detectar los cambios guardados en los detalles del Objetivo de Usuario
  detallesNodoCambio(huID: String) {
    this.huDetallesCambio.next(huID);
  }

  // Me sirve para detectar la Hu creada desde detalles y visualizarla en el gráfico
  addHuDetalles(huID: String) {
    this.huDetallesCreado.next(huID);
  }

  // Me sirve para saber que se ha clicado en el botón de añadir Iteración
  addIteration() {
    this.nuevaIteracion.next();
  }

  // Me sirve para saber que se ha añadido una nueva Iteración
  detallesIteration(iterID: String) {
    this.detallesIteracion.next(iterID);
  }

  // Me sirve para saber que se ha eliminado una iteración
  eliminaIteration(iterID: String) {
    this.eliminaIteracion.next(iterID);
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
