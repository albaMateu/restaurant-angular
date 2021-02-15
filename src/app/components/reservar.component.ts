import { calendarComponent } from './calendar.component';
import { sala } from './../models/sala';

import { ReservaService } from './../services/reservar.service';
import { Reserva } from './../models/reserva';

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';



@Component({
  selector: 'reservar',
  templateUrl: '../views/reservar.html',
  styleUrls: ['../../assets/css/reservar.css'],
  providers: [ReservaService]
})
export class reservarComponent{
  public sales: sala[];
  public reserva: Reserva;
  public clickedDate: Date
  ;
  public missatge:string;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _reservaService: ReservaService
  ) {
      this.reserva= new Reserva(1,1);
   }

  ngOnInit() {
    this.getSales();
  }

   onSubmit(){
    this.guardarReserva();
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
        console.log("error de sales ");
        console.log( <any>error);
      }
    ); //fin suscribe
  }

   //insertar reserva
   guardarReserva(){
     console.log(this.reserva);
     this._reservaService.addReserva(this.reserva).subscribe(
       result => {
         this.missatge = result;
         console.log("guardar reserva: " + this.missatge);
       },
       error => {
         console.log("error de reservar.component-guardar reserva: ");
         console.log(<any>error);
       }
     ); //fin suscribe
  }

  //número de taules necessaries per a la reserva
  taulesNecesaries(){
    if(this.reserva.pers < 5){
      this.reserva.taules=1;
    }else if(this.reserva.pers%2 == 0) {
      //si es parell
      this.reserva.taules= (this.reserva.pers/2)-1;
    }else {
      this.reserva.taules= Math.trunc(this.reserva.pers/2);
    }
    //descontar num de taules de la reserva de la sala elegida
  }



} //fin classe
