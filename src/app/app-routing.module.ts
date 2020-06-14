import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//curs
//import { ModuleWithProviders } from '@angular/core';


//rutes
const appRoutes: Routes = [
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
