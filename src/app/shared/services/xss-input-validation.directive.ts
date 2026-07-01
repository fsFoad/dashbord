import {Directive, forwardRef, HostListener, Input, OnInit} from '@angular/core'
import { AbstractControl, ControlContainer, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import {FieldErrorCode} from "../models/field-error-code";
import { AppSettings } from '../../app/AppSetting';
import { TranslocoService } from '@ngneat/transloco';
import { XssControlService } from './XssControlService';

const SPACE_CHAR = ' ';
const LTR_SEPARATOR = ',';
const RTL_SEPARATOR = '،';
const OTHERS_STRING = ' ...';
const MAX_INVALID_NUMBER_CHAR = 3;

function getSeparator(): string {
    return AppSettings.AppDirection === 'ltr' ? LTR_SEPARATOR : RTL_SEPARATOR;
}

@Directive({
    selector: '[XssInputValidation][formControlName],[XssInputValidation][formControl]',
    standalone: true,
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => XssInputValidationDirective), multi: true}
    ]
})
export class XssInputValidationDirective implements OnInit, Validator {
    private readonly alphabeticSeparator;
    private whiteListCharacters: string;
    private blackListCharacters: string;

    @Input() xssValidationType: string;
    @Input() formControl: AbstractControl;
    @Input() formControlName: any;

    constructor(
        private translation: TranslocoService,
        private xssControlService: XssControlService,
        private controlContainer: ControlContainer // Inject ControlContainer to access the FormGroup

    ) {
        this.alphabeticSeparator = this.translation.translate('and');
    }

    ngOnInit(): void {
        this.whiteListCharacters = this.xssControlService.getXssWhiteListCharacters();
        if (this.xssValidationType === 'date') {
            this.whiteListCharacters = this.xssControlService.getXssDateWhiteListCharacters();
        } else if (this.xssValidationType === 'permitted') {
            this.whiteListCharacters = this.xssControlService.getXssWhiteListCharacters() + ")(";
        }
        this.blackListCharacters = ('[^' + this.whiteListCharacters + ']');
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }

        const enteredValue: string = control.value.toString();
        const xssScan: XssRiskCheckResult = this.hasXssRisk(enteredValue);
        if (xssScan.isRiskyInput) {
            control.setValue(enteredValue.replace(new RegExp(this.blackListCharacters, 'gu'), ''), {emitEvent: false});
            return {
                [FieldErrorCode.XSS_VALIDATION_ERROR]: {
                    inputChar: [this.createListString(xssScan.enteredRiskyChars)]
                }
            }
        } else {
            return null;
        }
    }

    hasXssRisk(input: string): XssRiskCheckResult {
        const inputBlacklistChars: string[] = [];
        const uniqueInputBlacklistChars = new Set<string>(input.match(new RegExp(this.blackListCharacters, 'u')));
        uniqueInputBlacklistChars.forEach((value) => inputBlacklistChars.push(value));

        return {
            isRiskyInput: input.search(new RegExp(this.blackListCharacters, 'u')) >= 0,
            enteredRiskyChars: inputBlacklistChars
        };
    }

    @HostListener('blur') onBlur() {
        /*if (this.formControl.getError(FieldErrorCode.XSS_VALIDATION_ERROR)) {
            let errors = this.formControl.errors;
            if (errors) {
                delete errors[FieldErrorCode.XSS_VALIDATION_ERROR];
            }
            this.formControl.setValue(this.formControl.value);
        }*/
        const control = this.controlContainer.control?.get(this.formControlName); // Get the correct control using formControlName
        if (control?.getError(FieldErrorCode.XSS_VALIDATION_ERROR)) {
            const errors = control.errors;
            if (errors) {
                delete errors[FieldErrorCode.XSS_VALIDATION_ERROR];
            }
            control.setValue(control.value); // Update the value without emitting events
        }
    }

    registerOnValidatorChange(fn: () => void): void {
    }

    createListString(array: string[]): string {
        const separator = getSeparator();
        let result = '';
        array.forEach((value, index, arrayData) => {
            if (index <= MAX_INVALID_NUMBER_CHAR) {
                if (arrayData.length == 1 || ((index < arrayData.length - 1) && index !== MAX_INVALID_NUMBER_CHAR)) {
                    result = result.concat(value, separator, SPACE_CHAR);
                } else {
                    if (index === MAX_INVALID_NUMBER_CHAR) {
                        result = result.substring(0, result.length - 2);
                        result = result.concat(SPACE_CHAR, this.alphabeticSeparator, OTHERS_STRING);
                    } else if (index == arrayData.length - 1) {
                        result = result.substring(0, result.length - 2);
                        result = result.concat(SPACE_CHAR, this.alphabeticSeparator, SPACE_CHAR, value);
                    }
                }
            }
        });
        if (array.length == 1) {
            result = result.substring(0, result.length - 2);
        }
        return result;
    }
}

export interface XssRiskCheckResult {
    isRiskyInput: boolean,
    enteredRiskyChars: string[]
}
