import { GLOBAL } from './../services/global';
import { Component } from "@angular/core";


@Component({
  selector: 'contacte',
  templateUrl: '../views/contacte.html',
  styleUrls: ['../../assets/css/contacte.css']
})
export class contacteComponent{
  public adreca:string;
  public cp:number;
  public poblacio:string;
  public provincia:string;
  public tel: string;
  public email:string;

  constructor(){
    this.adreca= GLOBAL.adreca;
    this.cp=GLOBAL.cp;
    this.poblacio= GLOBAL.poblacio;
    this.provincia= GLOBAL.provincia;
    this.tel= GLOBAL.tel;
    this.email=GLOBAL.email;

    console.log("Contacte funciona");

  }

}
