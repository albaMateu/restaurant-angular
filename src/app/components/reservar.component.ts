import { calendarComponent } from './../calendar/calendar.component';
import { sala } from './../models/sala';

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
  public sales: sala[];
  public reserva: Reserva;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _reservaService: ReservaService
  ) {
      this.reserva= new Reserva(1,1,"","",new Date(Date.now()),"",1,"","");
   }

  ngOnInit() {
    console.log("reserva en marxa");
    this.getSales();
  }

  onSubmit(){
    console.log("Form enviado");
  }

  //mostra les sales
  getSales(){
    this._reservaService.getSales().subscribe(
      result => {
         if (result.code != 200) {
          console.log (result);
        }else{
          this.sales= result.data;
          console.log("es bien");
        }
      },
      error =>{
        console.log("error de reservar.component: ");
        console.log( <any>error);
      }
    ); //fin suscribe
  }
}
