import { Reserva } from './../models/reserva';
import { CONFIG } from './global';

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class ReservaService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = CONFIG.url;
  }


  getSales(): Observable<any> {
    return this._http.get(this.url + '/v1/sales');
  }
  getReserves(): Observable<any> {
    return this._http.get(this.url + '/v1/reserves');
  }

  addReserva(reserva: Reserva): Observable<any> {
    //let json = JSON.stringify(reserva);
    //let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //si retorna json, headers, si retorna soles test, response type
    return this._http.post(this.url + '/v1/reserva/new', reserva, { headers: headers } /* { responseType: 'text' } */);
  }

} //fin ReservaService
