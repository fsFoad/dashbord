import {Injectable} from '@angular/core';
import {Constants} from '../constants/Constants';

import moment from 'jalali-moment';

import {AbstractControl} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class CommonValidationsService {

//mobilePattern="/^\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^\d{9}|\d{10}$|^1\s\d{3}(-|\s)\d{3}(-|\s)\d{4}$|^(1\s?)?\(\d{3}\)(\s|\-)?\d{3}\-\d{4}$/"
    //let email_match =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ibanNumber2: bigint;

    constructor() {
    }

    validateNationalCodeLegal(code) {
        const L = code.length;
        if (L < 11 || parseInt(code, 10) == 0)
            return false;
        if (parseInt(code.substr(3, 6), 10) == 0)
            return false;
        const c = parseInt(code.substr(10, 1), 10);
        const d = parseInt(code.substr(9, 1), 10) + 2;
        const z = [29, 27, 23, 19, 17];
        let s = 0;
        for (let i = 0; i < 10; i++)
            s += ((d + parseInt(code.substr(i, 1), 10)) * z[i % 5]);
        s = s % 11;
        if (s == 10)
            s = 0;
        return (c == s);
    }

    containsPersianChars(str): boolean {
        const persianRegex = /[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F]+/;

        return persianRegex.test(str);

    }

    validateNationalCode(nationalCode: string): boolean {
        const length = nationalCode.length;
        if (length < 8 || parseInt(nationalCode, 10) == 0) {
            return false;
        }
        nationalCode = ('0000' + nationalCode).substr(length + 4 - 10);
        if (parseInt(nationalCode.substr(3, 6), 10) == 0) {
            return false;
        }
        const c = parseInt(nationalCode.substr(9, 1), 10);
        let s = 0;
        for (let i = 0; i < 9; i++) {
            s += parseInt(nationalCode.substr(i, 1), 10) * (10 - i);
        }
        s = s % 11;
        return (s < 2 && c == s) || (s >= 2 && c == (11 - s));
    }

    invalidMobile(mobile: string): boolean {
        ////console.log(mobile)
        const patternMobile = /^(?:\+98|0)[1-9][0-9]{9}$/;
        const resultRegexMobile = patternMobile.test(mobile);

        return !(resultRegexMobile);
    }

    invalidSite(site: string): boolean {
        ////console.log(mobile)
        // const patternSite = /^((www\.)?[\w.-]+\.[a-z]{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/g;
        const patternSite = /^((www\.)?[\w-]+(\.[\w-]+)+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/g;
        const resultRegexSite = patternSite.test(site);
        return !(resultRegexSite);
    }

    invalidIp(site: string): boolean {
        ////console.log(mobile)
        // const patternSite = /^((www\.)?[\w.-]+\.[a-z]{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/g;
        const patternIp = /^(\d{1,3}\.){3}\d{1,3}$/;
        const resultRegexSite = patternIp.test(site);
        return !(resultRegexSite);
    }

    validatePhone(mobile: string): boolean {
        return !(mobile.length != 11 || mobile.charAt(0) != '0');
    }

    validateAccountNumber(accountNo: string): boolean {
        return (accountNo.length === 13) && (!isNaN(Number(accountNo.substring(0, 3)))) && (isNaN(Number(accountNo.charAt(3)))) && (!isNaN(Number(accountNo.substring(5, 11))))
            && (isNaN(Number(accountNo.charAt(11)))) && ((!isNaN(Number(accountNo.charAt(12)))));
    }

    validateIbanInfo(ibanNumber: string): boolean {
        /*
        try {
            this.ibanNumber2 = BigInt(ibanNumber.substr(2, 25));
        }catch (e) {
            return true;
        }
        return (!(ibanNumber.length === 26) || !(ibanNumber.charAt(0) === 'I') ||
            !(ibanNumber.charAt(1) === 'R'));*/
        const pattern = /IR[0-9]{24}/;

        const $shebaCode = ibanNumber;

        if ($shebaCode.length !== 26) {
            return false;
        }

        if (!pattern.test($shebaCode)) {
            return false;
        }

        const d1 = $shebaCode.charCodeAt(0) - 65 + 10;
        const d2 = $shebaCode.charCodeAt(1) - 65 + 10;

        let newStr = $shebaCode.substr(4);
        newStr += d1.toString() + d2.toString() + $shebaCode.substr(2, 2);

        const remainder = this.iso7064Mod97_10(newStr);

        if (remainder !== 1) {
            return false;
        }

        return true;
    }

    private iso7064Mod97_10(iban: string): number {
        let remainder = iban,
            block;

        while (remainder.length > 2) {
            block = remainder.slice(0, 9);
            remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
        }

        return parseInt(remainder, 10) % 97;
    }

    valiateCardNo(cardNumber: string): boolean {
        // return verifyCardNumber(cardNumber);
        return null;
    }

    validatePostalCode(postalCode: string): boolean {
        // let postalCodePattern = new RegExp('\\b(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}\\b$');
        const postalCodePattern = new RegExp(Constants.postalPattern);
        return postalCodePattern.test(postalCode);
    }

    stringNotNullChecker(input: string): boolean {
        // input=input.toString()
        return (input != null && input != undefined && input != ''&& input != '0');
    }

    numberNotNullChecker(input: number): boolean {
      //  input=Number(input)
        return !(input === null || input === undefined || input === 0);
    }
    numberNotNullWithoutZeroChecker(input: number): boolean {
        //  input=Number(input)
        return !(input === null || input === undefined );
    }
    listNotNullChecker(input: any[]): boolean {
        return !(input === null || input === undefined || input.length < 1);
    }

    maximumDateChecker(input: number): boolean {
        // Assuming `input` is a Jalali date represented as a number (e.g., YYYYMMDD)
        const currentJalaliDate = moment().locale('fa').format('jYYYYjMMjDD');

        // Compare input with the current Jalali date (as a string or parse it to a number if needed)
        return input > parseInt(currentJalaliDate, 10);
    }

    maximumDateDayChecker(input: number|string): boolean {
        const moment1 = moment();

        return !(input <= moment1.format('jYYYYjMMjDD'))
    }
    maximumDateBeforeDayChecker(input: number): boolean {
        // Get the current Jalali date and format it to the same representation
        const currentJalaliDate = parseInt(moment().locale('fa').format('jYYYYjMMjDD'), 10);

        // Check if the input date is not less than the current date
        return input >= currentJalaliDate;  // Returns true if input is today or in the future
    }

    searchDateMaximumChecker(input: number): boolean {
        // Get the current Jalali date and format it to the same representation
        const currentJalaliDate = parseInt(moment().locale('fa').format('jYYYYjMMjDD'), 10);

        // Check if the input date is not less than or equal to the current date
        return input > currentJalaliDate;  // Returns true if input is strictly in the future
    }
    checkIpOrDomain(input: string): boolean {
        const trimmedInput = input.trim();
        const regex = /^((?:(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(?:25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})|(?:[a-zA-Z0-9_\-\@\$\&\^]+\.){1,}[a-zA-Z]{2,})$/;
        return regex.test(trimmedInput);
    }
    isBasicRSAKeyValueStructure(xml: string): boolean {
        const trimmedXml = xml.trim();
        const hasRoot = /^<RSAKeyValue>[\s\S]*<\/RSAKeyValue>$/.test(trimmedXml);
        const hasModulus = /<Modulus>[\s\S]*?<\/Modulus>/.test(trimmedXml);
        const hasExponent = /<Exponent>[\s\S]*?<\/Exponent>/.test(trimmedXml);

        return hasRoot && hasModulus && hasExponent;
    }
}

export function validateFormNationalCode(control: AbstractControl) {
    if (control?.value && !checkNationalCode(control.value)) {
        return {invalidNationalCode: true};
    }
    return null;
}

function checkNationalCode(control) {
    let nationalCode = control;
    const length = nationalCode.length;
    if (length < 8 || parseInt(nationalCode, 10) == 0) {
        return false;
    }
    nationalCode = ('0000' + nationalCode).substr(length + 4 - 10);
    if (parseInt(nationalCode.substr(3, 6), 10) == 0) {
        return false;
    }
    const c = parseInt(nationalCode.substr(9, 1), 10);
    let s = 0;
    for (let i = 0; i < 9; i++) {
        s += parseInt(nationalCode.substr(i, 1), 10) * (10 - i);
    }
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == (11 - s));
}

export function validateMobileReactiveForm(control: AbstractControl) {
    if (control?.value &&
        !(!(control.value.length != 11 || control.value.charAt(0) != '0' || control.value.charAt(1) != '9'))) {
        return {invalidNationalCode: true};
    }
    return null;
}

