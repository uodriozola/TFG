import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Proyecto } from '../clases/proyecto';
import { GLOBAL } from '../clases/global';

@Injectable()
export class ProyectoService {
  public url: String;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getProyectos() {
    return this._http.get(this.url + '/proyectos')
      .map(res => res.json());
  }

  getProyecto(id: String) {
    return this._http.get(this.url + '/proyecto/' + id)
      .map(res => res.json());
  }

  addProyecto(proyecto: Proyecto) {
    const json = JSON.stringify(proyecto);
    const params = json;
    const headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + '/proyecto', params, {headers: headers})
      .map(res => res.json());
  }

  deleteProyecto(id: String) {
    return this._http.delete(this.url + '/proyecto/' + id)
      .map(res => res.json());
  }

}
