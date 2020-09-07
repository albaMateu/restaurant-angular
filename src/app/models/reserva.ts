import { Time } from '@angular/common';

export class Reserva{
  constructor(
    public id:number,
    public pers: number,
    nom: string,
    tel:string,
    dia: Date,
    hora: Time,
    sala: number,
    email: string,
    coment:string

  ){

  }
}
