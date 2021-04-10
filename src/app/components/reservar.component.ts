import { modalComponent } from './modal.component';
import { sala } from './../models/sala';

import { ReservaService } from './../services/reservar.service';
import { Reserva } from './../models/reserva';

import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'reservar',
  templateUrl: '../views/reservar.html',
  styleUrls: ['../../assets/css/reservar.css'],
  providers: [ReservaService]
})
export class reservarComponent {
  public sales: sala[];
  public reserva: Reserva;
  public clickedDate: Date;
  today: Date = new Date();

  @ViewChild(modalComponent) modal: modalComponent;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _reservaService: ReservaService
  ) {

  }

  ngOnInit() {
    this.reserva = new Reserva(1, 1);
    this.getSales();

  }
  ngAfterViewInit() {
    /* this.modalInfo(); */
  }

  onSubmit() {
    this.guardarReserva();
  }

  modalInfo() {
    this.modal.title = "titol prova";
    this.modal.message = "missatge des de prova";
    this.modal.openModal();
  }

  //reb la data del component fill (calendari)
  reciveDate($event) {
    this.clickedDate = $event;
  }

  //mostra les sales
  getSales() {
    this._reservaService.getSales().subscribe(
      result => {
        this.sales = result;
      },
      error => {
        this.modal.title = "Error";
        this.modal.message = "No es poden mostrar les sales";
        console.log(<any>error);
      }
    ); //fin suscribe

  }


  //insertar reserva
  guardarReserva() {
    let missatge: string;
    let estat: string;
    this._reservaService.addReserva(this.reserva).subscribe(
      result => {
        this.modal.title = result.estat;
        this.modal.message = result.message;
      },
      error => {
        estat = "Error";
        missatge = "No s'ha pogut insertar la reserva";
        console.log("reserva error " + error.message);
      }
    ); //fin suscribe

    this.modal.openModal();
  }

  //número de taules necessaries per a la reserva
  taulesNecesaries() {
    if (this.reserva.pers < 5) {
      this.reserva.taules = 1;
    } else if (this.reserva.pers % 2 == 0) {
      //si es parell
      this.reserva.taules = (this.reserva.pers / 2) - 1;
    } else {
      this.reserva.taules = Math.trunc(this.reserva.pers / 2);
    }
    //descontar num de taules de la reserva de la sala elegida
  }

} //fin classe
