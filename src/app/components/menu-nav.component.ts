import { GLOBAL } from './../services/global';
import { Component } from '@angular/core';


@Component({
  selector: 'menu-nav',
  templateUrl: '../views/menu-nav.html',
  styleUrls: ['../../assets/css/menu-nav.css']
})
export class menuNavComponent {
  public nom: string;

  constructor() {
    this.nom = GLOBAL.nom;
  }

  ngOnInit() {

  }


}
