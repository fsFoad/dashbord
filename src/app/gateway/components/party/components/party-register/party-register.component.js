import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { ToggleSwitch } from "primeng/toggleswitch";
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
let PartyRegisterComponent = class PartyRegisterComponent {
    route;
    apiGatewayService;
    messagesApiFacadeService;
    _primengProgressBarService;
    fb;
    transloco;
    notifierService;
    close = new EventEmitter();
    constructor(route, apiGatewayService, messagesApiFacadeService, _primengProgressBarService, fb, transloco, notifierService) {
        this.route = route;
        this.apiGatewayService = apiGatewayService;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.fb = fb;
        this.transloco = transloco;
        this.notifierService = notifierService;
    }
    detailsBreadObject = [];
    title = '';
    status = false;
    registerTemp = {
        title: '',
        status: null,
    };
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.party'),
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('registerParty.header.registerParty'),
                        rout_index2: '',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    ngOnInit() {
        this.scrollTop();
        this.status = true;
        this.detailsBreadObject = this.chooseBread('partyBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element)
                element.scrollIntoView(true);
        });
    }
    onRegister() {
        if (this.validation()) {
            this.registerTemp.title = this.title;
            if (this.status) {
                this.registerTemp.status = 1;
            }
            else {
                this.registerTemp.status = 0;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerParty(this.registerTemp)
                .subscribe((partyRespons) => {
                this._primengProgressBarService.hide();
                this.close.emit('closeAndCreate');
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
    }
    onCancel() {
        this.close.emit('close');
    }
    validation() {
        if (!this.title) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerParty.message.enterPartyName'),
                life: 3000,
            });
            return false;
        }
        else {
            return true;
        }
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
};
__decorate([
    Output()
], PartyRegisterComponent.prototype, "close", void 0);
PartyRegisterComponent = __decorate([
    Component({
        selector: 'app-party-register',
        templateUrl: './party-register.component.html',
        standalone: true,
        imports: [
            TranslocoPipe,
            FormsModule,
            InputText,
            ButtonDirective,
            ToggleSwitch,
            BreadcrumbsComponent,
            Toast,
            Ripple,
        ],
        styleUrls: ['./party-register.component.scss'],
    })
], PartyRegisterComponent);
export { PartyRegisterComponent };
