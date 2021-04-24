import { Component } from '@angular/core';

@Component({
  selector: 'carta',
  templateUrl: '../views/carta.html',
  styleUrls: ['../../assets/css/carta.css']
})
export class cartaComponent {
  public carta1: string;
  public carta2: string;


  constructor() {
    //estes url de les cartes vindran de la base de dades.
    this.carta1 = '../../assets/images/Carta.jpg';
    this.carta2 = '../../assets/images/Carta.jpg';
  }

}
