import { TranslateService } from '@ngx-translate/core';
import { Component } from "@angular/core";

@Component({
  selector: 'error',
  templateUrl: '../views/error.html',
  styleUrls: ['../../assets/css/error.css']
})
export class errorComponent {
  public titulo: string;

  constructor(private translate: TranslateService) {
    this.titulo = "Ooops! La pàgina que busques pot ser se l'han menjada, dona-li al botó per tornar.";
    this.translate.instant('error404.titol');
  }

}
