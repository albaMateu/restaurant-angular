import { sala } from './sala';
import { formatDate } from '@angular/common';

export class Reserva{
    public id:number;
    public pers: number;
    public dia: string;
    public hora: string;
    public taules: number;
    public sala: number;
    public nom: string;
    public tel:string;
    public email: string;
    public estat: string;
    public coment:string;

  constructor(pers, sala){
    this.pers=pers;
    this.sala= sala;
    this.dia= formatDate( new Date(), 'yyyy-MM-dd', 'ca');
  }
}
