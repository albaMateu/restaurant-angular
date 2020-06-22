import { GLOBAL } from './../services/global';
import { Component } from '@angular/core';


@Component({
  selector: 'menu-nav',
  templateUrl: '../views/menu-nav.html'
})
export class menuNavComponent{
  public nom:string;

  constructor(){
    this.nom=GLOBAL.nom;
  }

  ngOnInit() {
    console.log("Menu-nav en marxa!");
  }


}
