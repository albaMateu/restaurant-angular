import { cartaComponent } from './components/carta.component';
import { contacteComponent } from './components/contacte.component';
import { errorComponent } from './components/error.component';
import { homeComponent } from './components/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//curs
//import { ModuleWithProviders } from '@angular/core';


//rutes
const appRoutes: Routes = [
  {path: '', component: homeComponent},
  {path: 'home', component: homeComponent},
  {path: 'contacte', component: contacteComponent},
  {path: 'carta', component: cartaComponent},
  {path: '**', component: errorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

//curs
/*export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
*/

export class AppRoutingModule { }
