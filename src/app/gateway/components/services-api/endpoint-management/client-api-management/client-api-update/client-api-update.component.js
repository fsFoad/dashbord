import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Panel } from "primeng/panel";
import { FormsModule } from "@angular/forms";
import { InputText } from "primeng/inputtext";
import { ButtonDirective } from "primeng/button";
import { MatTooltip } from "@angular/material/tooltip";
import { TranslocoPipe } from "@ngneat/transloco";
import { FileUpload } from "primeng/fileupload";
import { KeyFilter } from "primeng/keyfilter";
import { ToggleSwitch } from "primeng/toggleswitch";
import { Dialog } from "primeng/dialog";
import { Card } from "primeng/card";
let ClientApiUpdateComponent = class ClientApiUpdateComponent {
    route;
    messagesApiFacadeService;
    notifierService;
    _primengProgressBarService;
    validationsService;
    close = new EventEmitter();
    updateClient;
    apikey = null;
    name = null;
    mobileNo = null;
    publicKey = null;
    digitalPublickey = null;
    status = null;
    endpointId = null;
    organizationCode = null;
    allowedAccountno = null;
    clientId = null;
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
    showDialog;
    showDialog2;
    showDialog3;
    fileContent = '';
    constructor(route, messagesApiFacadeService, notifierService, _primengProgressBarService, validationsService) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.notifierService = notifierService;
        this._primengProgressBarService = _primengProgressBarService;
        this.validationsService = validationsService;
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
            }
            else {
                this.updateTemp.publicKey = null;
            }
            if (this.digitalPublickey !== null && this.publicKey !== '') {
                this.digitalPublickey = this.digitalPublickey.toString();
                this.updateTemp.digitalPublickey =
                    this.digitalPublickey.replace(/\n/g, '');
            }
            else {
                this.updateTemp.digitalPublickey = null;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerClient(this.updateTemp)
                .subscribe((a) => {
                this._primengProgressBarService.hide();
                this.close.emit('closeAndCreate');
            }, (error) => {
                this._primengProgressBarService.hide();
            });
        }
    }
    onDisplay() {
        if (this.apikey) {
            this.showDialog = true;
        }
    }
    myUploader(event, fileUploaderRef) {
        fileUploaderRef.clear();
        fileUploaderRef.uploadedFileCount = 0;
    }
    myUploader2(event, fileUploaderRef2) {
        fileUploaderRef2.clear();
        fileUploaderRef2.uploadedFileCount = 0;
    }
    onSelectPublicKey(fileList) {
        const file = fileList.currentFiles[0];
        const fileReader = new FileReader();
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
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.randomapikey().subscribe((a) => {
            this._primengProgressBarService.hide();
            this.apikey = a;
        }, (error) => {
            this._primengProgressBarService.hide();
        });
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
    onSelectDigital(fileList) {
        const file = fileList.currentFiles[0];
        const fileReader = new FileReader();
        const self = this;
        fileReader.onloadend = function (x) {
            self.fileContent = fileReader.result;
            ////console.log('self.fileContent');
            ////console.log(self.fileContent);
            self.digitalPublickey = self.fileContent;
        };
        fileReader.readAsText(file);
    }
    validationClient() {
        if (!this.name) {
            this.notifierService.showError({
                detail: 'لطفا نام را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.apikey) {
            this.notifierService.showError({
                detail: 'لطفا کلید کلاینت را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.mobileNo) {
            this.notifierService.showError({
                detail: 'لطفا شماره موبایل را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (this.validationsService.invalidMobile(this.mobileNo)) {
            this.notifierService.showError({
                detail: 'شماره موبایل را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.publicKey) {
            this.notifierService.showError({
                detail: 'لطفا کلید عمومی را وارد کنید!',
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
], ClientApiUpdateComponent.prototype, "close", void 0);
__decorate([
    Input()
], ClientApiUpdateComponent.prototype, "updateClient", void 0);
ClientApiUpdateComponent = __decorate([
    Component({
        selector: 'app-client-api-update',
        templateUrl: './client-api-update.component.html',
        styleUrls: ['./client-api-update.component.scss'],
        standalone: true,
        imports: [
            Panel,
            FormsModule,
            InputText,
            ButtonDirective,
            MatTooltip,
            TranslocoPipe,
            FileUpload,
            KeyFilter,
            ToggleSwitch,
            Dialog,
            Card
        ],
    })
], ClientApiUpdateComponent);
export { ClientApiUpdateComponent };
