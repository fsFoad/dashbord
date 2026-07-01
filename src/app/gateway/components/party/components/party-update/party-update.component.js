import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiGatewayConstants } from "../../../../constants/ApiGatewayConstants";
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { ToggleSwitch } from "primeng/toggleswitch";
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
let PartyUpdateComponent = class PartyUpdateComponent {
    route;
    messagesApiFacadeService;
    _primengProgressBarService;
    fb;
    apiGatewayService;
    transloco;
    notifierService;
    close = new EventEmitter();
    inputUpdate;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    statusList = ApiGatewayConstants.statusList;
    typeMessages = ApiGatewayConstants.typeMessages;
    constructor(route, messagesApiFacadeService, _primengProgressBarService, fb, apiGatewayService, transloco, notifierService) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.fb = fb;
        this.apiGatewayService = apiGatewayService;
        this.transloco = transloco;
        this.notifierService = notifierService;
    }
    title = '';
    partyId = null;
    status = false;
    detailsBreadObject = [];
    updateTemp = {
        title: '',
        status: null,
        partyId: null,
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
                        label_index2: this.transloco.translate('editParty.header.editParty'),
                        rout_index2: '/registerRule',
                        isActive2: true,
                        img_index2: 'assets/icons/update.png',
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
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    ngOnInit() {
        this.scrollTop();
        this.title = this.inputUpdate.title;
        this.partyId = this.inputUpdate.partyId;
        this.inputUpdate.status == 1
            ? (this.status = true)
            : (this.status = false);
        this.detailsBreadObject = this.chooseBread('partyBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    onUpdate() {
        if (this.validation()) {
            this.updateTemp.title = this.title;
            this.updateTemp.status = +this.status;
            this.updateTemp.partyId = +this.partyId;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerParty(this.updateTemp)
                .subscribe((a) => {
                this._primengProgressBarService.hide();
                this.close.emit('closeAndCreate');
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
    }
    onClose() {
        this.close.emit('close');
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }
    validation() {
        if (!this.title) {
            this.notifierService.showError({
                detail: this.transloco.translate('editParty.message.enterPartyName'),
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
], PartyUpdateComponent.prototype, "close", void 0);
__decorate([
    Input()
], PartyUpdateComponent.prototype, "inputUpdate", void 0);
PartyUpdateComponent = __decorate([
    Component({
        selector: 'app-party-update',
        templateUrl: './party-update.component.html',
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
        styleUrls: ['./party-update.component.scss'],
    })
], PartyUpdateComponent);
export { PartyUpdateComponent };
