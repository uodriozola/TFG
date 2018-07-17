import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Iteracion } from './iteracion';

@Injectable()
export class IteracionService {

  errorMessage: any;

  proyectoID: String;
  iteraciones: Iteracion[];
  public url: String;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
   }

   getApiUrl(segmento = ''): String {
    const url = this.url + segmento;
    return url;
  }

   // Coge de la BD todas las iteraciones del proyecto pasado como parámetro
  getIteraciones(proyectoId = null): Observable<Iteracion[]> {
    return this._http.get(this.url + '/iteraciones/' + proyectoId)
      .map(res => res.json()).map(
        response => {
          this.iteraciones = response.iteraciones;
          this.proyectoID = proyectoId;
          return this.iteraciones;
        },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
  }

   // Coge de la BD la iteración pasada como parámetro
   getIteracion(iteracionID: String): Observable<Iteracion> {
    return this._http.get(this.url + '/iteracion/' + iteracionID)
      .map(res => res.json()).map(
        response => {
          return response.iteracion;
        },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
  }

  // Añade una iteración a la BD
  addIteracion(iteracion: Iteracion) {
    const json = JSON.stringify(iteracion);
    const params = json;
    const headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + '/iteracion/' + iteracion.proyectoID, params, {headers: headers})
      .map(res => res.json());
  }

  // Actualiza una iteración en la BD
  updateIteracion(iteracionID: String, iteracion: Iteracion) {
    const json = JSON.stringify(iteracion);
    const params = json;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put(this.url + '/iteracion/' + iteracionID, params, { headers: headers})
    .map(res => res.json());
  }

}
