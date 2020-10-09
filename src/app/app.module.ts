import { CommonModule } from '@angular/common';

/*calendar*/
/* Hi ha que instalar npm install --save core-js @* per a que vaja
 i el calendar s'instala en ng add angular-calendar */
import 'zone.js/dist/zone';
import { calendarComponent } from './components/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


/* fi calendar*/

import { reservarComponent } from './components/reservar.component';
import { cartaComponent } from './components/carta.component';
import { contacteComponent } from './components/contacte.component';
import { errorComponent } from './components/error.component';
import { homeComponent } from './components/home.component';
import { footerComponent } from './components/footer.component';
import { menuNavComponent } from './components/menu-nav.component';

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';

/* Per a tindre la data en català */
import localeEs from '@angular/common/locales/ca';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);
/* fi tindre la data en català */

/*CURS
import {routing, appRoutingProviders} from './app-routing';
afegir routing en imports i appRoutingProviders en providers
*/

@NgModule({
  declarations: [
    AppComponent,
    menuNavComponent,
    footerComponent,
    homeComponent,
    errorComponent,
    contacteComponent,
    cartaComponent,
    reservarComponent,
    calendarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CalendarModule.forRoot(
      { provide: DateAdapter, useFactory: adapterFactory },
     )
  ],
  providers: [ {provide: LOCALE_ID, useValue: "ca"}],
  bootstrap: [AppComponent, calendarComponent]
})
export class AppModule { }

/* platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err)); */
