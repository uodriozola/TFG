import { Injectable } from '@angular/core';
import { HistoriaUsuario } from '../clases/hu';

@Injectable()
export class TiposService {

  constructor() { }

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
      nuevoPadre.tipo !== 'Increment' && hijo.tipo !== 'Division' && hermanos.length === 0) {
      hijo.tipo = 'Fusion';
      // Si tiene un padre tipo Incremento y otro que no,  es Incrementado
    } else if ((padres.filter(padre => (padre.tipo === 'Increment')).length > 0 || nuevoPadre.tipo === 'Increment') &&
      (padres.filter(padre => (padre.tipo !== 'Increment')).length > 0 || nuevoPadre.tipo !== 'Increment') && hijo.tipo !== 'Division'
      && hermanos.length === 0) {
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

}
