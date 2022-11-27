import { Reserva } from './../models/reserva';
import { CONFIG } from './global';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable()
export class ReservaService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
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

    //si retorna json, headers, si retorna soles test, response type
    return this._http.post(this.url + '/v1/reserva/new', reserva, { headers: this.headers } /* { responseType: 'text' } */);
  }

  getTaulesOcupades(args: Object): Observable<any> {

    //si retorna json, headers, si retorna soles text, response type
    return this._http.post(this.url + '/v1/ocupades', args, { headers: this.headers }  /* { responseType: 'text' } */);
  }

  sendEmailConfirm(reserva: Reserva): Observable<any> {
    //si retorna json, headers, si retorna soles text, response type
    return this._http.post(this.url + '/v1/reserva/mail', reserva, { headers: this.headers } /* { responseType: 'text' } */);
  }

} //fin ReservaService
