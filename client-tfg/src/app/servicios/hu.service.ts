import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HistoriaUsuario } from '../clases/hu';
import { GLOBAL } from '../clases/global';

@Injectable()
export class HuService {

  errorMessage: any;

  proyectoID: String;
  public url: String;

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }

  getApiUrl(segmento = ''): String {
    const url = this.url + segmento;
    return url;
  }

  // Coge de la BD todas las historias del usuario del proyecto pasado como parámetro
  getHus(proyectoId = null): Observable<HistoriaUsuario[]> {
    this.proyectoID = proyectoId;
    const ruta = this.url + '/hus/' + proyectoId;
    return this.httpClient.get<HistoriaUsuario[]>(ruta);
  }

  // Coge de la BD todas las historias del usuario del proyecto pasado como parámetro de la iteración correspondiente
  getHusIter(proyectoId, iteracion: Number): Observable<HistoriaUsuario[]> {
    const ruta = this.url + '/hus/' + proyectoId + '/' + iteracion;
    return this.httpClient.get<HistoriaUsuario[]>(ruta);
  }

  // Cojo de la BD los ID de los hijos del proyecto cuyo ID paso como parámetro
  public getHusTipo(hijoID: String, padreID: String): Observable<any[]> {
    const ruta = this.url + '/hus/tipos/' + this.proyectoID + '/' + hijoID + '/' + padreID;
    return this.httpClient.get<any[]>(ruta);
}

  // Cojo de la BD los ID de los hijos del proyecto cuyo ID paso como parámetro
  public getHijos(huID: String): Observable<HistoriaUsuario[]> {
    const ruta = this.url + '/hus/hijos/' + this.proyectoID + '/' + huID;
    return this.httpClient.get<HistoriaUsuario[]>(ruta);
}

// Cojo de la BD los descendientes del proyecto cuyo ID paso como parámetro
public getDescendientes(huID: String): Observable<HistoriaUsuario[]> {
  const ruta = this.url + '/hus/descendientes/' + this.proyectoID + '/' + huID;
  return this.httpClient.get<HistoriaUsuario[]>(ruta);
}

// Cojo de la BD los ascendientes del proyecto cuyo ID paso como parámetro
public getAscendientes(huID: String): Observable<HistoriaUsuario[]> {
  const ruta = this.url + '/hus/ascendientes/' + this.proyectoID + '/' + huID;
  return this.httpClient.get<HistoriaUsuario[]>(ruta);
}

// Cojo de la BD los ID de los padres del proyecto cuyo ID paso como parámetro
public getPadres(huID: String): Observable<HistoriaUsuario[]> {
  const ruta = this.url + '/hus/padres/' + this.proyectoID + '/' + huID;
  return this.httpClient.get<HistoriaUsuario[]>(ruta);
}

  // Coge de la BD la historia de usuario pasada como parámetro
  getHu(huID: String, padreId?: String): Observable<HistoriaUsuario> {
    let ruta = this.url + '/hu/' + huID;
    ruta = padreId !== undefined ? (ruta + '/' + padreId) : ruta;
    return this.httpClient.get<HistoriaUsuario>(ruta);
  }

  // Añade una historia de usuario al array hus y a la BD
  addHu(hu: HistoriaUsuario): Observable<HistoriaUsuario> {
    const json = JSON.stringify(hu);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<HistoriaUsuario>(this.url + '/hu/' + hu.proyectoID, params, {headers: headers});
  }

  // Actualiza una historia de usuario en la BD
  updateHu(huID: String, hu: HistoriaUsuario): Observable<HistoriaUsuario> {
    const json = JSON.stringify(hu);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<HistoriaUsuario>(this.url + '/hu/' + huID, params, { headers: headers});
  }

  // Borra una historia de usuario del array hus y de la BD
  deleteHu(huID: String): Observable<HistoriaUsuario> {
    return this.httpClient.delete<HistoriaUsuario>(this.url + '/hu/' + this.proyectoID + '/' + huID);
  }

}
