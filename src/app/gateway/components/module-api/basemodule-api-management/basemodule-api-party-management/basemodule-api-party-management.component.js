import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let BasemoduleApiPartyManagementComponent = class BasemoduleApiPartyManagementComponent {
    route;
    messagesApiFacadeService;
    apiGatewayService;
    fb;
    _primengProgressBarService;
    notifierService;
    transloco;
    close = new EventEmitter();
    inputModuleUpdate;
    partyDto;
    addFlag = false;
    updateFlag = false;
    moduleApiFlag = false;
    partyList = [];
    title = '';
    updatePartyDto;
    moduleTitle;
    pageno = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    constructor(route, messagesApiFacadeService, apiGatewayService, fb, _primengProgressBarService, notifierService, transloco) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.apiGatewayService = apiGatewayService;
        this.fb = fb;
        this._primengProgressBarService = _primengProgressBarService;
        this.notifierService = notifierService;
        this.transloco = transloco;
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    ngOnInit() {
        this.scrollTop();
        let startRow;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getpartyinfo(this.pageno, this.pagesize)
            .subscribe((b) => {
            this._primengProgressBarService.hide();
            this.partyList = b;
            if (Array.isArray(b)) {
                this.partyList = b;
            }
            else {
                this.partyList.push(b);
            }
            this.partyList.map((x) => x.status === 1 ? (x.status = true) : (x.status = false));
            if (this.pageno != 0 && this.pageno != 1) {
                for (let u = 0; u < this.partyList.length; u++) {
                    this.partyList[u] = Object.assign(this.partyList[u], { row: u + startRow + 1 });
                }
            }
            else if (this.pageno == 1) {
                debugger;
                for (let u = 0; u < this.partyList.length; u++) {
                    this.partyList[u] = Object.assign(this.partyList[u], { row: u + this.pagesize + 1 });
                    debugger;
                }
            }
            else {
                for (let u = 0; u < this.partyList.length; u++) {
                    this.partyList[u] = Object.assign(this.partyList[u], { row: u + 1 });
                    debugger;
                }
            }
        }, (error) => {
            this._primengProgressBarService.hide();
        });
    }
    showAdd(party) { }
    showUpdate(party) {
        this.updatePartyDto = {
            title: '',
            status: null,
            partyid: null,
        };
        this.updatePartyDto = party;
        this.updateFlag = true;
    }
    showModule() {
        this.addFlag = true;
    }
    clear() { }
    onClose(e) {
        if (e === 'close') {
            this.addFlag = false;
            this.updateFlag = false;
        }
        else if (e === 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.close.emit('doubleClose');
        }
    }
    search() { }
    validationParty() {
        if (!this.title || this.title == ' ') {
            this.notifierService.showError({
                detail: 'لطفا نام سازمان را جهت جستجو وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
};
__decorate([
    Output()
], BasemoduleApiPartyManagementComponent.prototype, "close", void 0);
__decorate([
    Input()
], BasemoduleApiPartyManagementComponent.prototype, "inputModuleUpdate", void 0);
BasemoduleApiPartyManagementComponent = __decorate([
    Component({
        selector: 'app-basemodule-api-party-management',
        templateUrl: './basemodule-api-party-management.component.html',
        standalone: true,
        styleUrls: ['./basemodule-api-party-management.component.scss'],
    })
], BasemoduleApiPartyManagementComponent);
export { BasemoduleApiPartyManagementComponent };
