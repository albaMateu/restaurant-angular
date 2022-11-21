import { Component, OnInit } from '@angular/core';
import { UserService as UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: '../views/register.html',
  styleUrls: ['../../assets/css/login.css']
})
export class RegisterComponent {

  email: string;
  password: string;
  confirmPassword: string;
  passwordError: boolean;

  constructor(public userService: UserService) { }

  register() {
    /* const user = { email: this.email, password: this.password };
    this.userService.register(user).subscribe(data => {
      console.log(data);
    }); */

  }

}
