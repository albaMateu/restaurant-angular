import { reservarComponent } from './components/reservar.component';
import { cartaComponent } from './components/carta.component';
import { contacteComponent } from './components/contacte.component';
import { errorComponent } from './components/error.component';
import { homeComponent } from './components/home.component';
import { footerComponent } from './components/footer.component';
import { headerComponent } from './components/header.component';
import { modalComponent } from './components/modal.component';
import { calendarComponent } from './components/calendar.component';
/*  fi dels meus components */

import { CommonModule } from '@angular/common';

/*calendar*/
/* Hi ha que instalar npm install --save core-js @* per a que vaja
 i el calendar s'instala en ng add angular-calendar */
import 'zone.js/dist/zone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
/* fi calendar*/

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';

/* idiomes disponibles */
import localeCa from '@angular/common/locales/ca';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

/* per als modals */
/* importar dependencia en consola ng add ng-bootstrap */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* ng add @fortawesome/angular-fontawesome@* */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/* traduccions instalar npm install @ngx-translate/core @ngx-translate/http-loader --save */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";



/*importar els idiomes */
registerLocaleData(localeCa);
registerLocaleData(localeEs);

/* Per a la traducció */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    footerComponent,
    homeComponent,
    errorComponent,
    contacteComponent,
    cartaComponent,
    reservarComponent,
    calendarComponent,
    modalComponent,
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
    ),
    NgbModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'es'
  }],
  bootstrap: [AppComponent]
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
