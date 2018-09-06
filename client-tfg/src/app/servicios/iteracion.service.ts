import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from '../clases/global';
import { Iteracion } from '../clases/iteracion';

@Injectable()
export class IteracionService {

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

   // Coge de la BD todas las iteraciones del proyecto pasado como parámetro
  getIteraciones(proyectoId: String): Observable<Iteracion[]> {
    this.proyectoID = proyectoId;
    const ruta = this.url + '/iteraciones/' + proyectoId;
    return this.httpClient.get<Iteracion[]>(ruta);
  }

   // Coge de la BD la iteración pasada como parámetro
   getIteracion(iteracionID: String): Observable<Iteracion> {
     const ruta = this.url + '/iteracion/' + iteracionID;
    return this.httpClient.get<Iteracion>(ruta);
  }

  // Añade una iteración a la BD
  addIteracion(iteracion: Iteracion): Observable<Iteracion> {
    const json = JSON.stringify(iteracion);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<Iteracion>(this.url + '/iteracion/' + iteracion.proyectoID, params, {headers: headers});
  }

  // Actualiza una iteración en la BD
  updateIteracion(iteracionID: String, iteracion: Iteracion): Observable<Iteracion> {
    const json = JSON.stringify(iteracion);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.put<Iteracion>(this.url + '/iteracion/' + iteracionID, params, { headers: headers});
  }

  // Borra una iteración de la BD
  deleteIteracion(iteracionID: String): Observable<Iteracion> {
    return this.httpClient.delete<Iteracion>(this.url + '/iteracion/' + iteracionID);
  }

}
