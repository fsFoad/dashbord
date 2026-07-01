// @ts-nocheck
import { Component, EventEmitter, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';

import {FormBuilder, FormsModule} from '@angular/forms';

import {PartyDto} from "../../../../models/party.Dto";
import {ActivatedRoute} from "@angular/router";
import {MessagesApiFacadeService} from '../../../../services/messages-api-facade.service';
import {FuseLoadingService} from '@fuse/services/loading';
import {ToastService} from '../../../../../shared/services/ToastService';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {InputText} from 'primeng/inputtext';

import {ButtonDirective} from 'primeng/button';
import {ToggleSwitch} from "primeng/toggleswitch";
import {BreadcrumbsComponent} from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {Toast} from 'primeng/toast';
import {ApiGatewayService} from '../../../../services/api-gateway.service';
import {Ripple} from 'primeng/ripple';


@Component({
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
  schemas: [NO_ERRORS_SCHEMA],
})
export class PartyRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();

    constructor(
        private route: ActivatedRoute,
        private apiGatewayService: ApiGatewayService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private fb: FormBuilder,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {}
    detailsBreadObject=[]
    title = '';
    status = false;
    registerTemp: PartyDto = {
        title: '',
        status: null,
    };
    chooseBread(caseBase: string) {
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
                        label_index1:this.transloco.translate('breadcrumbs.party'),
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
    ngOnInit(): void {
        this.scrollTop();
        this.status = true;
        this.detailsBreadObject=this.chooseBread('partyBase')
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    onRegister() {
        if (this.validation()) {
            this.registerTemp.title = this.title;
            if (this.status) {
                this.registerTemp.status = 1;
            } else {
                this.registerTemp.status = 0;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerParty(this.registerTemp)
                .subscribe(
                    (partyRespons) => {
                        this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    onCancel() {
        this.close.emit('close');
    }

    validation(): boolean {
        if (!this.title) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerParty.message.enterPartyName'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
}
