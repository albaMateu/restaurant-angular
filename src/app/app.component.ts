import { footerComponent } from './components/footer.component';
import { menuNavComponent } from './components/menu-nav.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Restaurant';
}
