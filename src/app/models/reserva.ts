import { sala } from './sala';

export class Reserva{
  constructor(
    public id:number,
    public pers: number,
    public nom: string,
    public tel:string,
    public dia: Date,
    public hora: string,
    public sala: number,
    public email: string,
    public coment:string

  ){

  }
}
