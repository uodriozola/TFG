import { Injectable } from '@angular/core';
import { HistoriaUsuario } from '../clases/hu';
import { Tareas } from '../clases/tareas';

@Injectable()
export class TareasService {

  constructor() { }

  // Devuelve la posición de la última tarea realizada
  public ultimaTarea(tareas: Tareas): Number {
    const estado = [tareas.a1.realizado, tareas.a2.realizado, tareas.a3.realizado, tareas.finalizado.realizado];
    const verdadero = estado.lastIndexOf(true);
    return verdadero;
  }

  // En función de las tareas realizadas devuelve el color del nodo
  public colorTarea(tareas: Tareas): String {
    if (tareas.finalizado.realizado) {
      return '#898584';
    } else if (tareas.a3.realizado) {
      return '#C2BDBB';
    } else if (tareas.a2.realizado) {
      return '#E2DEDD';
    } else if (tareas.a1.realizado) {
      return '#F7EFEE';
    } else {
      return '#FFFFFF';
    }
  }

  // Dadas unas tareas y la posición desde la que no pueden ser modificadas, pone a false la opción habilitar de las anteriores
  public deshabilitaTareas(tareas: Tareas, pos: Number): Tareas {
    const habilitado = [true, true, true, true];
    for (let x = 0; x <= pos; x++) {
      habilitado[x] = false;
    }
    tareas.a1.habilitado = habilitado[0];
    tareas.a2.habilitado = habilitado[1];
    tareas.a3.habilitado = habilitado[2];
    tareas.finalizado.habilitado = habilitado[3];
    return tareas;
  }

  // Dado un OU, en función de su tipo, decide las tareas que tienen realizadas y habilitadas sus padres o hijos
  public setTareas(hu: HistoriaUsuario, padres: HistoriaUsuario[], hijos: HistoriaUsuario[]): HistoriaUsuario[] {
    const res: HistoriaUsuario[] = [];
    // Si tiene más de un padre los padres heredan del hijo
    if (padres.length > 1) {
      for (const padre of padres) {
        if (this.ultimaTarea(hu.tareas) > this.ultimaTarea(padre.tareas)) {
          padre.tareas = hu.tareas;
        }
        padre.tareas = this.deshabilitaTareas(padre.tareas, this.ultimaTarea(hu.tareas));
        res.push(padre);
      }
    }
    // Si tiene más de un hijo los hijos heredan del padre
    if (hijos.length > 1) {
      for (const hijo of hijos) {
        if (this.ultimaTarea(hu.tareas) > this.ultimaTarea(hijo.tareas)) {
          hijo.tareas = hu.tareas;
        }
        hijo.tareas = this.deshabilitaTareas(hijo.tareas, this.ultimaTarea(hu.tareas));
        res.push(hijo);
      }
    }
    return res;
  }

}
