import { menuNavComponent } from './components/menu-nav.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';

/*CURS
import {routing, appRoutingProviders} from './app-routing';
afegir routing en imports i appRoutingProviders en providers
*/

@NgModule({
  declarations: [
    AppComponent,
    menuNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
