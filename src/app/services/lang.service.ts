import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class langService {
    supportedLangs = ['es', 'ca'];
    defaultLang = 'es';


    constructor(private translate: TranslateService) { }

    getLang(): string {
        const userLang = this.translate.getBrowserLang();
        return this.supportedLangs.includes(userLang) ? userLang : this.defaultLang;
    }
}