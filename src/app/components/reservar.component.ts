import { Sala } from './../models/sala';
import { modalComponent } from './modal.component';

import { ReservaService } from './../services/reservar.service';
import { Reserva } from './../models/reserva';

import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { addDays } from 'date-fns';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HORARI } from '../services/global';


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
  public min_d: Date;
  public max_d: Date;
  public siguiente: boolean = false;
  public missatge: String;
  public disponible: boolean = false;
  public min_h_m: string;
  public max_h_m: string;
  public min_h_v: string;
  public max_h_v: string;
  public validator_hora: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _reservaService: ReservaService
  ) {
    this.max_d = addDays(new Date(), 32);
    this.min_d = new Date()
    this.min_h_m = HORARI.inici_m;
    this.max_h_m = HORARI.final_m;
    this.min_h_v = HORARI.inici_v;
    this.max_h_v = HORARI.final_v;
  }

  validarHoraM(hora: string) {
    if ((hora > this.min_h_m && hora < this.max_h_m) || (hora > this.min_h_v && hora < this.max_h_v)) {
      this.reserva.hora = hora;
      this.validator_hora = null;
    } else {
      this.validator_hora = "L'hora ha d'estar compresa entre les " + this.min_h_m + " i les " + this.max_h_m +
        " o entre les " + this.min_h_v + " i les " + this.max_h_v;
    }
  }

  ngOnInit() {
    this.reserva = new Reserva(1, 1);
    this.getSales();
  }
  ngAfterViewInit() {
    /* this.modalProva(); */
  }

  onSubmit(formReserva: NgForm) {
    this.guardarReserva(formReserva);

  }

  modalProva() {
    this.modal.title = "titol prova";
    this.modal.message = "missatge des de prova";
    this.modal.openModal();
  }

  //envia el mail confirmació reserva
  sendEmail(title: string, missatge: string) {

    this._reservaService.sendEmailConfirm(this.reserva).subscribe(
      result => {
        if (result.envio) {
          this.modal.message = missatge + '<br/> Rebràs un email de confirmació de la teua reserva. <br>' +
            'Si no el rebs, revisa la safata spam ';
        } else {
          this.modal.message = missatge + "<br/> OOH no ... <br/>Ha hagut un problema amb l'enviament del email de confirmació." +
            "<br/> Pots confirmar la teua reserva enviant un email o cridant al telèfon que apareix a la web. <br/> Disculpa les molèsties.";
        }
        this.modal.title = title;
        this.modal.openModal();
      },
      error => {
        console.log("envio email error " + error.message);
      }
    ); //fin suscribe

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
            " a les " + this.reserva.hora + " en la sala sol·licitada. <br/>" +
            "Prova altra sala, altre dia o hora diferent.";
        }
      },
      error => {
        console.log("next ERROR: " + error)
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
  guardarReserva(formReserva: NgForm) {
    this._reservaService.addReserva(this.reserva).subscribe(
      result => {
        this.sendEmail(result.estat, result.message);
        formReserva.resetForm(new Reserva(1, 1));
        this.back();
      },

      error => {
        this.modal.title = "Error";
        this.modal.message = "No s'ha pogut insertar la reserva";
        console.log("reserva error " + error.message);
        this.modal.openModal();
      }
    ); //fin suscribe
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
