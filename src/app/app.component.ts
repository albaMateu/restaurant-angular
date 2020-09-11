import { footerComponent } from './components/footer.component';
import { menuNavComponent } from './components/menu-nav.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title:string;
  public href: string = "";

    constructor(private router: Router) {
      this.title= "Restaurant";
    }

    ngOnInit() {
        this.href = this.router.url;
        //console.log(this.router.url);
    }
}
