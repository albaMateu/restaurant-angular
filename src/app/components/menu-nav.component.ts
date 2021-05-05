import { GLOBAL } from './../services/global';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ignoreElements } from 'rxjs/operators';
import { of } from 'rxjs';
import { browser } from 'protractor';

@Component({
  selector: 'menu-nav',
  templateUrl: '../views/menu-nav.html',
  styleUrls: ['../../assets/css/menu-nav.css']
})
export class menuNavComponent {
  public nom: string;
  public idiomes: Array<object> = [
    { "lang": "es", "nom": "Español" },
    { "lang": "ca", "nom": "Català" }
  ];
  public langActual: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['es', 'ca']);

    const browserLang = translate.getBrowserLang();
    const lang = translate.use(browserLang.match(/es|ca/) ? browserLang : 'es');

  }

  ngOnInit() {
    this.nom = GLOBAL.nom;

  }


}
