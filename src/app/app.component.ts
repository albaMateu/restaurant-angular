import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public href: string = "";

  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.href = this.router.url;
  }

}
