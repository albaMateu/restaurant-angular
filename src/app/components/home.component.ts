import { Component } from "@angular/core";

@Component({
  selector: 'home',
  templateUrl: '../views/home.html'
})
export class homeComponent{


  constructor(){

  }
  ngOnInit() {
    console.log('Home en marxa');
  }



}
