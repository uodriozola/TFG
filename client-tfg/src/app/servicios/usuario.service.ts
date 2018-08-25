import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Usuario } from '../clases/usuario';
import { GLOBAL } from '../clases/global';
import { tap } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

  public url: String;
  public username: String;

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url;
   }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    const json = JSON.stringify(usuario);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<Usuario>(this.url + '/registro', params, {headers: headers});
  }

  loginUsuario(usuario: Usuario): Observable<Usuario> {
    const json = JSON.stringify(usuario);
    const params = json;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<Usuario>(this.url + '/login', params, {headers: headers, withCredentials: true}).pipe(tap(res => {
      this.username = res.username;
      return res;
    }));
  }

  getUsuario() {
    return this.httpClient.get(this.url + '/usuario', {
      withCredentials: true
    });
  }

  logoutUsuario() {
    return this.httpClient.get(this.url + '/logout', {
      withCredentials: true
    });
  }

}
