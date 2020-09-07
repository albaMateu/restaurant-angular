import { ReservaService } from './../services/reservar.service';
import { Reserva } from './../models/reserva';

import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'reservar',
  templateUrl: '../views/reservar.html',
  styleUrls: ['../../assets/css/reservar.css'],
  providers: [ReservaService]
})
export class reservarComponent{
  public sales: Array<any>[];

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _reservaService: ReservaService
  ) { }

  ngOnInit() {
    console.log("reserva en marxa");
  }


  //mostra les sales
  getSales(){
    this._reservaService.getSales().subscribe(
      result=> {
        if (result.code != 200) {
          console.log (result);
        }else{
          this.sales= result.data;
        }
      },
      error =>{
        console.log(<any>error);
      }
    ); //fin suscribe
  }
}
