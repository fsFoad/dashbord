import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleDto} from "../../../../models/Module.Dto";
import {MessagesApiFacadeService} from "../../../../services/messages-api-facade.service";
import {FormBuilder} from "@angular/forms";
import {ApiGatewayService} from "../../../../services/api-gateway.service";
import {ActivatedRoute} from "@angular/router";
// FUSEFS

// FUSEFS

// import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-basemodule-api-party-management',
    templateUrl: './basemodule-api-party-management.component.html',
    standalone: true,
    styleUrls: ['./basemodule-api-party-management.component.scss'],
})
export class BasemoduleApiPartyManagementComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputModuleUpdate: ModuleDto;
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
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private fb: FormBuilder,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private notifierService:ToastService ,
        private transloco:TranslocoService
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getpartyinfo(this.pageno, this.pagesize)
            .subscribe(
                (b) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                    this.partyList = b;
                    if (Array.isArray(b)) {
                        this.partyList = b;
                    } else {
                        this.partyList.push(b);
                    }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        debugger;
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesize + 1 }
                            );
                            debugger;
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                            debugger;
                        }
                    }
                },
                (error) => {
                    // FUSEFS

                    // this._primengProgressBarService.hide();
                }
            );
    }

    showAdd(party) {}

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

    clear() {}

    onClose(e: any) {
        if (e === 'close') {
            this.addFlag = false;
            this.updateFlag = false;
        } else if (e === 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.close.emit('doubleClose');
        }
    }

    search() {}

    validationParty(): boolean {
        if (!this.title || this.title == ' ') {
            this.notifierService.showError({
                detail: 'لطفا نام سازمان را جهت جستجو وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
