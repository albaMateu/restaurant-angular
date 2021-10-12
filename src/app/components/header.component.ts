import { GLOBAL, LANG } from '../services/global';
import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { calendarComponent } from './calendar.component';


@Component({
  selector: 'header-comp',
  templateUrl: '../views/header.html',
  styleUrls: ['../../assets/css/header.css']
})
export class headerComponent {
  public nom: string;
  public idiomes: Array<any> = [
    { "lang": "es", "nom": "Español" },
    { "lang": "ca", "nom": "Català" }
  ];
  public lang: string = "Español";

  @ViewChild(calendarComponent) calendar: calendarComponent;

  constructor(public translate: TranslateService) {
    translate.addLangs(['es', 'ca']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/es|ca/) ? browserLang : 'es');
  }

  ngOnInit() {
    this.nom = GLOBAL.nom;
  }

  getLang(lang: string) {
    this.translate.use(lang);
    LANG.actual = lang;
    this.idiomes.forEach(idioma => {
      if (lang == idioma.lang) {
        this.lang = idioma.nom;
      }
    });
  }

}
