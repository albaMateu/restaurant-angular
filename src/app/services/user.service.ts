import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CONFIG } from "./global";

@Injectable()
export class UserService {
    public url: string;
    public headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private _http: HttpClient) {
        this.url = CONFIG.url;
    }

    getToken(): Observable<any> {
        return this._http.get(this.url + '/v1/user/token', { headers: this.headers });
    }

    getTokenByEmail(email: string): Observable<any> {
        return this._http.post(this.url + '/v1/user/token', email, { headers: this.headers });
    }

    getUserByEmail(email: string): Observable<any> {
        return this._http.post(this.url + '/v1/user/email', email, { headers: this.headers });
    }

    /*  login(hash: string): Observable<any> {
         return this._http.post(this.url + '/v1/user/login', hash, { headers: this.headers });
     } */

    register(hash: string): Observable<any> {
        return this._http.post(this.url + '/v1/user/login', hash, { headers: this.headers });
    }
}