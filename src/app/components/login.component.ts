import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Md5 } from 'ts-md5';
import { modalComponent } from './modal.component';
import { TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-login',
    templateUrl: '../views/login.html',
    styleUrls: ['../../assets/css/login.css'],
    providers: [UserService]
})

export class LoginComponent {

    @ViewChild(modalComponent) modal: modalComponent;

    public email_new: string;
    public email: string;
    public password: string;
    public password_new: string;
    public confirmPassword: string;
    public passwordError: boolean;

    constructor(public _userService: UserService,
        private translate: TranslateService) {

    }

    //pide token
    getToken(): string {
        this._userService.getToken().subscribe(
            result => {
                console.log("gettoken:" + result.token);

                return result.token;
            },
            error => {
                console.log(error.message);
                return null;
            }
        );
        return null;
    }

    getTokenByEmail(email: string): string {
        this._userService.getTokenByEmail(email).subscribe(
            result => {
                console.log("gettokenbyemail:" + result.token);

                return result.token;
            },
            error => {
                console.log(error.message);
                return null;
            }
        );
        return null;
    }

    existUser(email: string) {

        return new Promise((resolve, reject) => {
            if (email) {
                this._userService.getUserByEmail(email).subscribe(
                    result => {
                        console.log("existUser:" + result.exist);

                        resolve(result.exist);
                    },
                    error => {
                        console.log("error exist user");
                        console.log(error);
                        reject(false);
                    }
                );
            } else {
                resolve(false);
            }

        })
    }



    async register() {

        //comprovar que no existeix el email
        const userExist = await this.existUser(this.email_new);


        if (!userExist && this.password_new === this.confirmPassword && this.password_new !== "") {

            //demanar token
            const token = this.getToken();

            //pwd + token hash
            const hash_pwd = Md5.hashStr(this.password_new + token);

            //guardar token en local storage
            localStorage.setItem("token", hash_pwd);

            //encode base64
            const user_encode = btoa(this.email_new + ":" + hash_pwd + ":" + token);

            //envia email:hash:token
            this._userService.register(user_encode).subscribe(
                result => {
                    console.log("register:" + result);

                    this.modal.title = 'reservar-errors.modal-title';
                    this.modal.message = "Compte creat amb èxit";
                },
                error => {
                    console.log(error.message);
                    this.modal.title = 'reservar-errors.modal-title';
                    this.modal.message = "Hem tingut problemes per crear el compte, prova més tard";
                    this.modal.openModal();
                }
            );

        } else {

            console.log("usuario existente o pwd vacía");

            this.modal.title = 'reservar-errors.modal-title';
            this.modal.message = "Ha hagut un problema. Revisa les dades.";
            this.modal.openModal();

        }

    }

    /* login() {
     
        const token = this.getTokenByEmail(this.email);
     
     
        const hash_pwd = Md5.hashStr(this.password + token);
     
        //encode base64
        const encode = btoa(this.email + ":" + hash_pwd + ":" + token);
     
        this._userService.login(encode).subscribe(
            result => {
                //guardar token en local storage
                localStorage.setItem("token", hash_pwd);
     
                //redirigir a index
                //modal de logueado
     
            },
            error => {
                console.log(error.message);
                localStorage.setItem("token", hash_pwd);
                //modal de error en el login
            }
        );
    } */


    logout() {
        localStorage.removeItem("token");
        //redirigir a login
    }

}