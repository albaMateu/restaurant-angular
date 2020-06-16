import { GLOBAL } from './../services/global';
import { Component } from '@angular/core';


@Component({
  selector: 'menu-nav',
  templateUrl: '../views/menu-nav.html',
  styleUrls: ['../../assets/menu-nav.scss']
})
export class menuNavComponent{
  public nom;

  constructor(){
    this.nom=GLOBAL.nom;
  }

  ngOnInit() {
    console.log("Menu-nav en marxa!");
  }


}
