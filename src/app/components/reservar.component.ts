import { calendarComponent } from './calendar.component';
import { sala } from './../models/sala';

import { ReservaService } from './../services/reservar.service';
import { Reserva } from './../models/reserva';

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'reservar',
  templateUrl: '../views/reservar.html',
  styleUrls: ['../../assets/css/reservar.css'],
  providers: [ReservaService]
})
export class reservarComponent{
  public sales: sala[];
  public reserva: Reserva;
  public clickedDate: Date;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _reservaService: ReservaService
  ) {
      this.reserva= new Reserva(1,1,"","",this.clickedDate,"",1,"","");
   }

  ngOnInit() {
    console.log("reserva en marxa");
    this.getSales();
  }

   onSubmit(){
  /*  this.guardarReserva();
    console.log("Form enviado");*/
  }

  //reb la data del component fill (calendari)
  reciveDate($event){
    this.clickedDate= $event;
  }

  //mostra les sales
  getSales(){
    this._reservaService.getSales().subscribe(
      result => {
          this.sales= result;
      },
      error =>{
        console.log("error de sales.component: ");
        console.log( <any>error);
      }
    ); //fin suscribe
  }

   //insertar reserva
   guardarReserva(){
     console.log("guardar:");
     console.log( this.reserva);
    this._reservaService.addReserva(this.reserva).subscribe(
      result => {
         if (result.code != 200) {
          console.log (result);
        }else{
          this.reserva= result.data;
          console.log("es bien:"+result.data);
          console.log(this.reserva);
        }
      },
      error =>{
        console.log("error de reservar.component: ");
        console.log( <any>error);
      }
    ); //fin suscribe
  }
}
