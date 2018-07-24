import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HistoriaUsuario } from '../clases/hu';
import { GLOBAL } from '../clases/global';

@Injectable()
export class HuService {

  errorMessage: any;

  proyectoID: String;
  hus: HistoriaUsuario[];
  historiaUsuario: HistoriaUsuario;
  public url: String;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
    this.historiaUsuario = null;
  }

  getApiUrl(segmento = ''): String {
    const url = this.url + segmento;
    return url;
  }

  // Coge de la BD todas las historias del usuario del proyecto pasado como parámetro
  getHus(proyectoId = null) {
    return this._http.get(this.url + '/hus/' + proyectoId)
      .map(res => res.json()).map(
        response => {
          this.hus = response.hus;
          this.proyectoID = proyectoId;
        },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
  }

  // Coge de la BD todas las historias del usuario del proyecto pasado como parámetro de la iteración correspondiente
  getHusIter(proyectoId = null, iteracion: Number) {
    return this._http.get(this.url + '/hus/' + proyectoId + '/' + iteracion)
      .map(res => res.json()).map(
        response => {
          return response.hus;
        },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
  }

  // Cojo de la BD los ID de los hijos del proyecto cuyo ID paso como parámetro
  public getHijosTipo(huID: String) {
    return this._http.get(this.url + '/hus/hijos/' + this.proyectoID + '/' + huID)
        .map(res => res.json()).map(
          response => {
            return response;
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
          }
        });
}

public getPadres(huID: String) {
  return this._http.get(this.url + '/hus/padres/' + this.proyectoID + '/' + huID)
      .map(res => res.json()).map(
        response => {
          return response.hus[0].padres;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
}

  // Coge de la BD la historia de usuario pasada como parámetro
  getHu(huID: String): Observable<HistoriaUsuario> {
    return this._http.get(this.url + '/hu/' + huID)
      .map(res => res.json()).map(
        response => {
          this.historiaUsuario = response.hu;
          return this.historiaUsuario;
        },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
  }

  // Añade una historia de usuario al array hus y a la BD
  addHu(hu: HistoriaUsuario) {
    this.hus.push(hu);
    const json = JSON.stringify(hu);
    const params = json;
    const headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + '/hu/' + hu.proyectoID, params, {headers: headers})
      .map(res => res.json());
  }

  // Actualiza una historia de usuario en la BD
  updateHu(huID: String, hu: HistoriaUsuario) {
    const json = JSON.stringify(hu);
    const params = json;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.put(this.url + '/hu/' + huID, params, { headers: headers})
    .map(res => res.json());
  }

  // Borra una historia de usuario del array hus y de la BD
  deleteHu(huID: String) {
    this.historiaUsuario = this.hus.find((item) => {
      return item._id === huID;
    });
    this.hus.splice(this.hus.indexOf(this.historiaUsuario), 1);

    return this._http.delete(this.url + '/hu/' + huID)
      .map(res => res.json());
  }

}
