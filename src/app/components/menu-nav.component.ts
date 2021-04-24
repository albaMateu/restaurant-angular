import { GLOBAL } from './../services/global';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'menu-nav',
  templateUrl: '../views/menu-nav.html',
  styleUrls: ['../../assets/css/menu-nav.css']
})
export class menuNavComponent {
  public nom: string;
  public idiomes: Object;

  constructor(public translate: TranslateService) {
    translate.addLangs(['es', 'ca']);

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/es|ca/) ? browserLang : 'es');
  }

  ngOnInit() {
    this.nom = GLOBAL.nom;
  }


}
