import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Proyecto } from '../clases/proyecto';
import { GLOBAL } from '../clases/global';
import { UsuarioService } from './usuario.service';

@Injectable()
export class ProyectoService {
  public url: String;

  constructor(private httpClient: HttpClient,
              private usuarioService: UsuarioService) {
    this.url = GLOBAL.url;
  }

  getProyectos(username: String): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.url + '/proyectos/' + username);
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

  updateProyecto(proyectoID: String, proyecto: Proyecto): Observable<Proyecto> {
    const json = JSON.stringify(proyecto);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.put<Proyecto>(this.url + '/proyecto/' + proyectoID, params, { headers: headers});
  }

  deleteProyecto(id: String): Observable<Proyecto> {
    return this.httpClient.delete<Proyecto>(this.url + '/proyecto/' + id);
  }

}
