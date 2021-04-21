import { GLOBAL, HORARI } from './../services/global';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'footer-comp',
  templateUrl: '../views/footer.html',
  styleUrls: ['../../assets/css/footer.css']
})
export class footerComponent {
  public adreca: string;
  public cp: number;
  public poblacio: string;
  public provincia: string;
  public tel: string;
  public email: string;
  public autora: string;
  public i_m: string;
  public f_m: string;
  public i_v: string;
  public f_v: string;
  public semana_txt: string;

  constructor(public _router: Router) {
    this.adreca = GLOBAL.adreca;
    this.cp = GLOBAL.cp;
    this.poblacio = GLOBAL.poblacio;
    this.provincia = GLOBAL.provincia;
    this.tel = GLOBAL.tel;
    this.email = GLOBAL.email;
    this.autora = "Alba Mateu";
    this.i_m = HORARI.inici_m;
    this.i_v = HORARI.inici_v;
    this.f_m = HORARI.cierre_m;
    this.f_v = HORARI.cierre_v;
    this.semana_txt = HORARI.semana_txt;

  }
  ngOnInit() {
  }



}
