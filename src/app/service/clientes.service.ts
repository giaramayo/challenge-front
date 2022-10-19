import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private nodeURL = environment.url;
  private clienteURL = this.nodeURL + '/cliente'

  constructor( private readonly http: HttpClient ) { }

  getAll(): Observable<any> {
    return this.http.get(this.clienteURL);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(this.clienteURL + '/delete/' + id);
  }

  modificar(id: number, body: any): Observable<any> {
    return this.http.put(this.clienteURL + '/update/' + id, body);
  }

  crear(body: any): Observable<any> {
    return this.http.post(this.clienteURL + '/add', body);
  }
}
