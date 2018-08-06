import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Proyecto } from '../clases/proyecto';
import { GLOBAL } from '../clases/global';

@Injectable()
export class ProyectoService {
  public url: String;

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }

  getProyectos(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.url + '/proyectos');
  }

  getProyecto(id: String): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.url + '/proyecto/' + id);
  }

  addProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const json = JSON.stringify(proyecto);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<Proyecto>(this.url + '/proyecto', params, {headers: headers});
  }

  deleteProyecto(id: String): Observable<Proyecto> {
    return this.httpClient.delete<Proyecto>(this.url + '/proyecto/' + id);
  }

}
