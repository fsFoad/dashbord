import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export  class DirectionService {

    faDirection: Direction= 'rtl' ;
    enDirection: Direction= 'ltr' ;
    ENLangFlag=false;


    constructor() {
        if (environment.defaultLanguage=='en'){
            this.faDirection= 'ltr'
            this.enDirection= 'rtl'
            this.ENLangFlag= true;

        }else if(environment.defaultLanguage=='fa') {
            this.faDirection= 'rtl'
            this.enDirection= 'ltr'
            this.ENLangFlag= false;
        }
    }
}
export declare type Direction = 'ltr' | 'rtl';
