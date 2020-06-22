import { GLOBAL } from './../services/global';
import { Component } from "@angular/core";

@Component({
  selector: 'footer-comp',
  templateUrl: '../views/footer.html',
  styleUrls: ['../../assets/css/footer.css']
})
export class footerComponent{
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

  }
  ngOnInit() {
    console.log('Footer en marxa');
  }



}
