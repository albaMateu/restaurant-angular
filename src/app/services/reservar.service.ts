import { Reserva } from './../models/reserva';
import { CONFIG } from './global';

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class ReservaService{
  public url:string;

  constructor(
    public _http:HttpClient
  ){
    this.url=CONFIG.url;
  }


  getSales(): Observable<any>{
    return this._http.get(this.url+'/sales');
  }


} //fin ReservaService
