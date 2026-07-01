import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TranslocoPipe } from '@ngneat/transloco';
import { MatTooltip } from '@angular/material/tooltip';
import { FileUpload } from 'primeng/fileupload';
import { KeyFilter } from 'primeng/keyfilter';
import { Card } from 'primeng/card';
import { ToggleSwitch } from 'primeng/toggleswitch';
let ClientApiRegisterComponent = class ClientApiRegisterComponent {
    route;
    messagesApiFacadeService;
    apiFacadeService;
    _primengProgressBarService;
    notifierService;
    validationsService;
    close = new EventEmitter();
    registerClintApi;
    apikey = null;
    name = null;
    mobileNo = null;
    publicKey = null;
    digitalPublickey = null;
    status = null;
    endpointID = null;
    organizationCode = null;
    allowedAccountno = null;
    clientTemp = {
        apikey: '',
        name: '',
        mobileNo: '',
        publicKey: '',
        digitalPublickey: '',
        status: null,
        organizationCode: '',
        allowedAccountno: null,
    };
    message = null;
    approvalText = null;
    showDialog;
    showDialog2;
    showDialog3;
    stepUpload = false;
    selectedFile;
    fileContent = '';
    dubFlag = false;
    constructor(route, messagesApiFacadeService, apiFacadeService, _primengProgressBarService, notifierService, validationsService) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.apiFacadeService = apiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.notifierService = notifierService;
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
        this.status = true;
    }
    onCancel() {
        this.close.emit('close');
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
    onDisplay() {
        if (this.apikey) {
            this.showDialog = true;
        }
    }
    // fileContent: string | ArrayBuffer = '';
    onDisplayUploadPublicKey() {
        if (this.publicKey) {
            this.showDialog2 = true;
        }
    }
    onDisplayUploadDigital() {
        if (this.digitalPublickey) {
            this.showDialog3 = true;
        }
    }
    onRegister() {
        if (this.validationClient()) {
            for (let i = 0; i < this.registerClintApi.clientList.length; i++) {
                if (this.mobileNo ==
                    this.registerClintApi.clientList[i].mobileNo) {
                    this.dubFlag = true;
                    this.notifierService.showError({
                        detail: 'این کلاینت در لیست کلاینت های سرویس وجود دارد!',
                        life: 3000,
                    });
                    break;
                }
                else {
                    this.dubFlag = false;
                }
            }
            if (!this.dubFlag) {
                this.clientTemp.allowedAccountno = this.allowedAccountno;
                this.clientTemp.apikey = this.apikey;
                this.clientTemp.name = this.name;
                this.clientTemp.mobileNo = this.mobileNo;
                this.status == true
                    ? (this.clientTemp.status = 1)
                    : (this.clientTemp.status = 0);
                this.clientTemp.organizationCode = this.organizationCode;
                if (this.publicKey !== null) {
                    this.publicKey = this.publicKey.toString();
                    this.clientTemp.publicKey = this.publicKey.replace(/\n/g, '');
                }
                else {
                    this.clientTemp.publicKey = null;
                }
                if (this.digitalPublickey !== null) {
                    this.digitalPublickey = this.digitalPublickey.toString();
                    this.clientTemp.digitalPublickey =
                        this.digitalPublickey.replace(/\n/g, '');
                }
                else {
                    this.clientTemp.digitalPublickey = null;
                }
                ////console.log(msg + "\n")
                const tempClientApi = {
                    clientId: null,
                    apiId: null,
                    dailyCount: null,
                    weeklyCount: null,
                    monthlyCount: null,
                    authType: null,
                    basicAuthUsername: null,
                    basicAuthPassword: null
                };
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerClient(this.clientTemp)
                    .subscribe((res) => {
                    this._primengProgressBarService.hide();
                    if (this.registerClintApi != undefined) {
                        tempClientApi.apiId =
                            this.registerClintApi.apiId;
                        tempClientApi.dailyCount =
                            this.registerClintApi.dailyCount;
                        tempClientApi.weeklyCount =
                            this.registerClintApi.weeklyCount;
                        tempClientApi.monthlyCount =
                            this.registerClintApi.monthlyCount;
                        tempClientApi.authType = this.registerClintApi.serviceRequestVerify;
                        tempClientApi.basicAuthUsername = this.registerClintApi.registerClintApi.user;
                        tempClientApi.basicAuthPassword = this.registerClintApi.registerClintApi.pass;
                    }
                    tempClientApi.clientId = res.clientId;
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .clientAttachApi(tempClientApi)
                        .subscribe((e) => {
                        this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
                    }, (error) => {
                        this._primengProgressBarService.hide();
                    });
                }, (error) => {
                    this._primengProgressBarService.hide();
                });
            }
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
    /*  onChange(fileList: FileList): void {
          let file = fileList[0];
          let fileReader: FileReader = new FileReader();
          let self = this;
          fileReader.onloadend = function(x) {
              self.fileContent = fileReader.result;
              ////console.log('self.fileContent');
              ////console.log(self.fileContent);
              self.publicKey = self.fileContent;
          }
          fileReader.readAsText(file);
      }*/
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
    /*  let file = fileList[0];
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function(x) {
          self.fileContent = fileReader.result;
          ////console.log('self.fileContent');
          ////console.log(self.fileContent);
          self.publicKey = self.fileContent;
      }
      fileReader.readAsText(file);*/
    uploadedFiles;
    uploadHandler(event, fileUploaderRef) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
            ////console.log(this.uploadedFiles)
        }
        fileUploaderRef.clear();
        fileUploaderRef.uploadedFileCount = 0;
    }
    onKeydown(event) {
        const self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }
    onKeydownUploadDigital(e) {
        const self = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                self.onSelectDigital(event);
            }
        });
    }
    onKeydownUploadPublicKey(e) {
        const self = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                self.onSelectPublicKey(event);
            }
        });
    }
    onKeydownGenerate(e) {
        const self = this;
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                self.generateApikey();
            }
        });
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
], ClientApiRegisterComponent.prototype, "close", void 0);
__decorate([
    Input()
], ClientApiRegisterComponent.prototype, "registerClintApi", void 0);
ClientApiRegisterComponent = __decorate([
    Component({
        selector: 'app-client-api-register',
        templateUrl: './client-api-register.component.html',
        styleUrls: ['./client-api-register.component.scss'],
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
], ClientApiRegisterComponent);
export { ClientApiRegisterComponent };
