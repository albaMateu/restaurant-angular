import { Component } from "@angular/core";

@Component({
  selector: 'error',
  templateUrl: '../views/error.html',
  styleUrls: ['../../assets/css/error.css']
})
export class errorComponent{
  public titulo:string;

  constructor(){
    this.titulo="Error 404. Pàgina no trobada";
  }

}
