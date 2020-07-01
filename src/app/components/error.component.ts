import { Component } from "@angular/core";

@Component({
  selector: 'error',
  templateUrl: '../views/error.html',
  styleUrls: ['../../assets/css/error.css']
})
export class errorComponent{
  public titulo:string;

  constructor(){
    this.titulo="Ooops! La pàgina que busques pot ser se l'han menjada, dona-li al botó per tornar.";
  }

}
