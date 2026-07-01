import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ClientDto} from "../../../../../models/client.Dto";
import {ActivatedRoute} from "@angular/router";
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../../../shared/services/ToastService';
import {MessagesApiFacadeService} from '../../../../../services/messages-api-facade.service';
import {CommonValidationsService} from '../../../../../../shared/validators/common-validations.service';
import {Panel} from "primeng/panel";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {TranslocoPipe} from "@jsverse/transloco";
import {FileUpload} from "primeng/fileupload";
import {KeyFilter} from "primeng/keyfilter";
import {ToggleSwitch} from "primeng/toggleswitch";
import {Dialog} from "primeng/dialog";
import {Card} from "primeng/card";
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-client-api-update',
    templateUrl: './client-api-update.component.html',
    styleUrls: ['./client-api-update.component.scss'],
    standalone: true,
    imports: [
        Panel,
        FormsModule,
        InputText,
        ButtonDirective,
        Tooltip,
        TranslocoPipe,
        FileUpload,
        KeyFilter,
        ToggleSwitch,
        Dialog,
        Card

    ],
})
export class ClientApiUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() updateClient: ClientDto;

    apikey: string = null;
    name: string = null;
    mobileNo: string = null;
    publicKey: string | ArrayBuffer = null;
    digitalPublickey: string | ArrayBuffer = null;
    status: boolean = null;
    endpointId: number = null;
    organizationCode: string = null;
    allowedAccountno: number = null;
    clientId: number = null;
    updateTemp = {
        apikey: '',
        name: '',
        mobileNo: '',
        publicKey: '',
        digitalPublickey: '',
        status: null,
        organizationCode: '',
        allowedAccountno: null,
        endpointId: null,
        clientId: null,
    };
    stepUpload = false;
    showDialog: boolean;
    showDialog2: boolean;
    showDialog3: boolean;
    fileContent: string | ArrayBuffer = '';

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private validationsService: CommonValidationsService
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
        this.allowedAccountno = this.updateClient.allowedAccountno;
        this.apikey = this.updateClient.apikey;
        this.name = this.updateClient.name;
        this.mobileNo = this.updateClient.mobileNo;
        this.publicKey = this.updateClient.publicKey;
        this.digitalPublickey = this.updateClient.digitalPublickey;
        this.endpointId = this.updateClient.endpointId;
        this.organizationCode = this.updateClient.organizationCode;
        this.clientId = this.updateClient.clientId;
        this.updateClient.status == 1
            ? (this.status = true)
            : (this.status = false);
    }

    onCancel() {
        this.close.emit('close');
    }

    onUpdate() {
        if (this.validationClient()) {
            this.allowedAccountno !== null
                ? (this.updateTemp.allowedAccountno = this.allowedAccountno)
                : (this.allowedAccountno = null);
            this.apikey !== null && this.apikey !== ''
                ? (this.updateTemp.apikey = this.apikey)
                : (this.apikey = null);
            this.name !== null && this.name !== ''
                ? (this.updateTemp.name = this.name)
                : (this.name = null);
            this.mobileNo !== null && this.mobileNo !== ''
                ? (this.updateTemp.mobileNo = this.mobileNo)
                : (this.mobileNo = null);
            this.updateTemp.endpointId = this.endpointId;
            this.organizationCode !== null && this.organizationCode !== ''
                ? (this.updateTemp.organizationCode = this.organizationCode)
                : (this.organizationCode = null);
            this.updateTemp.clientId = this.clientId;
            this.status == true
                ? (this.updateTemp.status = 1)
                : (this.updateTemp.status = 0);
            if (this.publicKey !== null && this.publicKey !== '') {
                this.publicKey = this.publicKey.toString();
                this.updateTemp.publicKey = this.publicKey.replace(/\n/g, '');
            } else {
                this.updateTemp.publicKey = null;
            }
            if (this.digitalPublickey !== null && this.publicKey !== '') {
                this.digitalPublickey = this.digitalPublickey.toString();
                this.updateTemp.digitalPublickey =
                    this.digitalPublickey.replace(/\n/g, '');
            } else {
                this.updateTemp.digitalPublickey = null;
            }
            // FUSEFS

            // this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerClient(this.updateTemp)
                .subscribe(
                    (a) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
                    },
                    (error) => {
                        // FUSEFS

                        // this._primengProgressBarService.hide();
                    }
                );
        }
    }

    onDisplay() {
        if (this.apikey) {
            this.showDialog = true;
        }
    }

    myUploader(event: any, fileUploaderRef: any): void {
        fileUploaderRef.clear();
        fileUploaderRef.uploadedFileCount = 0;
    }

    myUploader2(event: any, fileUploaderRef2: any): void {
        fileUploaderRef2.clear();
        fileUploaderRef2.uploadedFileCount = 0;
    }

    onSelectPublicKey(fileList: any): void {
        const file = fileList.currentFiles[0];
        const fileReader: FileReader = new FileReader();
        const self = this;
        fileReader.onloadend = function (x) {
            self.fileContent = fileReader.result;
            ////console.log('self.fileContent');
            ////console.log(self.fileContent);
            self.publicKey = self.fileContent;
        };

        fileReader.readAsText(file);
    }

    generateApikey() {
        this.apikey = '';
        // FUSEFS

        // this._primengProgressBarService.show();
        this.messagesApiFacadeService.randomapikey().subscribe(
            (a) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.apikey = a;
            },
            (error) => {
                // FUSEFS

                // this._primengProgressBarService.hide();
            }
        );
    }

    onDisplayUploadDigital() {
        if (this.digitalPublickey) {
            this.showDialog3 = true;
        }
    }

    onDisplayUploadPublicKey() {
        if (this.publicKey) {
            this.showDialog2 = true;
        }
    }

    onSelectDigital(fileList: any): void {
        const file = fileList.currentFiles[0];
        const fileReader: FileReader = new FileReader();
        const self = this;
        fileReader.onloadend = function (x) {
            self.fileContent = fileReader.result;
            ////console.log('self.fileContent');
            ////console.log(self.fileContent);
            self.digitalPublickey = self.fileContent;
        };

        fileReader.readAsText(file);
    }

    validationClient(): boolean {
        if (!this.name) {
            this.notifierService.showError({
                detail: 'لطفا نام را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.apikey) {
            this.notifierService.showError({
                detail: 'لطفا کلید کلاینت را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.mobileNo) {
            this.notifierService.showError({
                detail: 'لطفا شماره موبایل را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.validationsService.invalidMobile(this.mobileNo)) {
            this.notifierService.showError({
                detail: 'شماره موبایل را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.publicKey) {
            this.notifierService.showError({
                detail: 'لطفا کلید عمومی را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
