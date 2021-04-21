import { Sala } from './../models/sala';
import { modalComponent } from './modal.component';

import { ReservaService } from './../services/reservar.service';
import { Reserva } from './../models/reserva';

import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { addDays } from 'date-fns';
import { formatDate } from '@angular/common';


@Component({
  selector: 'reservar',
  templateUrl: '../views/reservar.html',
  styleUrls: ['../../assets/css/reservar.css'],
  providers: [ReservaService]
})
export class reservarComponent {

  @ViewChild(modalComponent) modal: modalComponent;

  public sales: [Sala];
  public reserva: Reserva;
  public clickedDate: Date;
  public min = new Date();
  public max: Date = addDays(new Date(), 32);
  public siguiente: boolean = false;
  public missatge: String;
  public disponible: boolean = false;

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
    this.guardarReserva();
  }

  modalProva() {
    this.modal.title = "titol prova";
    this.modal.message = "missatge des de prova";
    this.modal.openModal();
  }

  //amaga i mostra una part del form i crida al mètdod disponibilitat
  next() {
    this.taulesNecesaries();
    this.disponibilitat().then(
      res => {
        /* si el mètodo disponibilitat retorna true */
        if (res) {
          /* passa a la pestanya següent per a posar les dades */
          this.siguiente = !this.siguiente;

        } else {
          /* mostrar span dient que no hi ha disponibilitat */
          this.missatge = "No hi ha taules disponibles per al dia " + formatDate(this.reserva.dia, "dd-MM-yyyy", "ca") +
            " a les " + this.reserva.hora + " en la sala sol·licitada";

        }
        console.log("next");
        console.log(res);
      },
      error => {
        console.log(error)
        console.log("ha salido false");
      }

    );
  }

  back() {
    this.siguiente = !this.siguiente;
  }
  /* comprova si es possible la reserva en eixe dia, hora, nº de persones i sala */
  disponibilitat() {

    let salaObject = this.getSala(this.reserva.sala);
    var args: Object = {
      dia: this.reserva.dia,
      sala: this.reserva.sala,
      hora: this.reserva.hora
    };

    return new Promise((resolve, reject) => {
      this._reservaService.getTaulesOcupades(args).subscribe(
        result => {

          let ocupades = result.ocup + this.reserva.taules;

          //si hi han taules lliures
          if (result.ocup < salaObject.taules) {

            //si caben les que necesitem per a la reserva
            if (ocupades <= salaObject.taules) {
              console.log("disponibilitat");
              resolve(true);
            }
          }
          resolve(false);

        },
        error => {
          console.log("disponibilitat error " + error.message);
          reject(false);
        }
      );
    }
    )
  }

  //busca una sala per id
  getSala(id: number) {
    var sala = null;
    for (const s of this.sales) {
      if (s.id == id) {
        sala = s;
      }
    }
    return sala;

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
    this._reservaService.addReserva(this.reserva).subscribe(
      result => {
        this.modal.title = result.estat;
        this.modal.message = result.message;
      },
      error => {
        this.modal.title = "Error";
        this.modal.message = "No s'ha pogut insertar la reserva";
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
  }

} //fin classe
