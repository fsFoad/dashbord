import {Injectable} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root'
})
export class TranslateConstantsService {
    notifiSuccess = '';
    licenseInfoList = [];
    customerTypes = [];
    citizenshipTypes=[];
    genderTypes=[];
    countryList=[];
    provinceList=[];
    cityList=[];
    residenceTypes=[];
    howResidence=[];
    terminalTypesList=[];

    organizationList=[];
    priorityList=[];
    channels = []




    constructor(public translateService: TranslocoService) {
        setTimeout(() => {
            this.notifiSuccess = this.translateService.translate('label.http.status.200');
            this.customerTypes = [
                {name: this.translateService.translate('real'), code: '1'},
                {name: this.translateService.translate('legal'), code: '2'},

            ];
            this.licenseInfoList = [
                {'name': '-', 'code': null},
                {'name': this.translateService.translate('business.license'), 'code': 1},
                {'name': this.translateService.translate('establishment.permit'), 'code': 2},
                {'name': this.translateService.translate('educational.license'), 'code': 3},
                {'name': this.translateService.translate('established.license'), 'code': 4},
                {'name': this.translateService.translate('licensing.packaging.distribution.production'), 'code': 5},
            ];
            this.citizenshipTypes = [
                {name: this.translateService.translate('iranian'), code: '1'},
                {name: this.translateService.translate('non.iranian'), code: '2'},
            ];
            this.genderTypes = [
                {name: '-', code: null},
                {name: this.translateService.translate('man'), code: '1'},
                {name: this.translateService.translate('female'), code: '2'},
            ];
        this.countryList = [
                {name: '-', code: null},
                {name: 'ایران', code: '1'},
                // {name: 'انگلیس', code: '2'},
                // {name: 'عربستان', code: '3'},
            ];
        this.provinceList = [
                {name: '-', code: null},
                {name: 'تهران', code: '1', countryCode: '1'},
                {name: 'اصفهان', code:'2', countryCode: '1'},
                {name: 'فارس', code: '3', countryCode: '1'},
                {name: 'خراسان رضوی', code: '4', countryCode: '1'},
                {name: 'قم', code: '5', countryCode: '1'},
                {name: 'کرمان', code: '6', countryCode: '1'},
            ];
        this.cityList = [
                {name: '-', code: null},
                {name: 'تهران', code: '1', provinceCode: '1'},
                {name: 'قم', code: '2', provinceCode: '5'},
                {name: 'اصفهان', code: '3', provinceCode: '2'},
                {name: 'شیراز', code: '4', provinceCode: '3'},
                {name: 'مشهد', code: '5', provinceCode: '4'},
                {name: 'کرمان', code: '6' , provinceCode: '6'},
                {name: 'سیرجان', code: '7', provinceCode: '6'},
                {name: 'رفسنجان', code: '8', provinceCode: '6'},
                {name: 'جیرفت', code: '9', provinceCode: '6'},
                {name: 'بم', code: '10', provinceCode: '6'},
            ];
            this.residenceTypes = [
                {name: '-', code: null},
                {name: this.translateService.translate('resident'), code: '1'},
                {name: this.translateService.translate('non.resident'), code: '2'},
            ];
            this.howResidence = [
                {name: '-', code: null},
                {name: this.translateService.translate('always'), code: '1'},
                {name: this.translateService.translate('temporary'), code: '2'},
            ];
            this.terminalTypesList = [
                {code: null, name: '-'},
                {code: '1', name: this.translateService.translate('sales.terminal.connected.telephone.line')},
                {code: '2', name: this.translateService.translate('terminal.connected.network.line')},
                {code: '3', name: this.translateService.translate('terminal.connected.cash.register')},
                {code: '4', name: this.translateService.translate('mobile.sales.terminal')},
                {code: '5', name: this.translateService.translate('online.payment.gateway')},
            ];


            this.priorityList = [
                {code: null, name: '-'},
                {code: 1, name: this.translateService.translate('first.priority')},
                {code: 2, name: this.translateService.translate('second.priority')},
                {code: 3, name: this.translateService.translate('third.priority')},
                {code: 4, name: this.translateService.translate('fourth.priority')},
                {code: 5, name: this.translateService.translate('fifth.priority')},
                {code: 6, name: this.translateService.translate('اولویت ششم')},
                {code: 7, name: this.translateService.translate('اولویت هفتم')},
                {code: 8, name: this.translateService.translate('اولویت هشتم')},
                {code: 9, name: this.translateService.translate('اولویت نهم')},
                {code: 10, name: this.translateService.translate('اولویت دهم')},
            ];
            this.organizationList = [
                {code: null, name: '-'},
                {code: 1, name: this.translateService.translate('resalat.bank')},
                {code: 2, name: this.translateService.translate('tavanir.organization')},
                {code: 3, name: this.translateService.translate('ministry.health.medical.education')},
                {code: 4, name: this.translateService.translate('ministry.industry.mine.trade')},
            ];
            this.channels = [
                {id: 1, label: this.translateService.translate('central.bank.wbo.port')},
                {id: 2, label: this.translateService.translate('internet.bank.port')},
                {id: 3, label: this.translateService.translate('mobile.bank.port')},
                {id: 4, label: this.translateService.translate('resalat.virtual.counter.port')},
                {id: 5, label: this.translateService.translate('parsian.e.commerce.port')},
                {id: 6, label: this.translateService.translate('emHesam.bo.port')},
                {id: 7, label: this.translateService.translate('emBazar.members.registry.port')},
            ];
        }, 150);

    }
}
