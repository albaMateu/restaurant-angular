import { modalComponent } from './modal.component';
import { sala } from './../models/sala';

import { ReservaService } from './../services/reservar.service';
import { Reserva } from './../models/reserva';

import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { addDays } from 'date-fns';


@Component({
  selector: 'reservar',
  templateUrl: '../views/reservar.html',
  styleUrls: ['../../assets/css/reservar.css'],
  providers: [ReservaService]
})
export class reservarComponent {

  @ViewChild(modalComponent) modal: modalComponent;

  public sales: sala[];
  public reserva: Reserva;
  public clickedDate: Date;
  public min = new Date();
  public max: Date = addDays(new Date(), 32);
  public siguiente: boolean = false;

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
    /* this.modalProva(); */
  }

  onSubmit() {
    /*  this.guardarReserva(); */
  }

  modalProva() {
    this.modal.title = "titol prova";
    this.modal.message = "missatge des de prova";
    this.modal.openModal();
  }

  //amaga i mostra una part del form i crida al mètdod disponibilitat
  next() {
    /* si el mètodo disponibilitat retorna true */
    if (this.disponibilitat()) {
      /* passa a la pestanya següent per a posar les dades */
      this.siguiente = !this.siguiente;
    } else {
      /* mostrar span dient que no hi ha disponibilitat */
    }
  }
  back() {
    this.siguiente = !this.siguiente;
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
    this.taulesNecesaries();
    this._reservaService.addReserva(this.reserva).subscribe(
      result => {
        this.modal.title = result.estat;
        this.modal.message = result.message + "<br> taules " + this.reserva.taules;
      },
      error => {
        estat = "Error";
        missatge = "No s'ha pogut insertar la reserva";
        console.log("reserva error " + error.message);
      }
    ); //fin suscribe

    this.modal.openModal();
  }

  /* comprova si es possible la reserva en eixe dia, hora, nº de persones i sala */
  disponibilitat() {
    return true;
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
  }

} //fin classe
