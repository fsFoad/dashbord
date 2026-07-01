import { Injectable } from '@angular/core';

export const whiteListChars = '\\p{L}\\p{N}\\s_\\-:,،=@?\\*.\\]\\[\u200C'
export const whiteListDateChars = '\\p{L}\\p{N}\\s_\\-:,،=@?\\*.\\]\\[\u200C\\/'

@Injectable(
    {
        providedIn: 'root'
    }
)
export class XssControlService{
    constructor() {

    }

    public getXssWhiteListCharacters(): string {
        return whiteListChars;
    }

    public getXssDateWhiteListCharacters(): string {
        return whiteListDateChars;
    }

}
