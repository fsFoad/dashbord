import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { FileUpload } from 'primeng/fileupload';
import { Dialog } from 'primeng/dialog';
import { Card } from 'primeng/card';
import { ToggleSwitch } from "primeng/toggleswitch";
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
let ClientRegisterComponent = class ClientRegisterComponent {
    route;
    messagesApiFacadeService;
    _primengProgressBarService;
    apiFacadeService;
    notifierService;
    apiGatewayService;
    transloco;
    validationsService;
    close = new EventEmitter();
    registerEndpoint;
    apikey = null;
    name = null;
    shenase = null;
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
        shenase: '',
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
    detailsBreadObject = [];
    constructor(route, messagesApiFacadeService, _primengProgressBarService, apiFacadeService, notifierService, apiGatewayService, transloco, validationsService) {
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this._primengProgressBarService = _primengProgressBarService;
        this.apiFacadeService = apiFacadeService;
        this.notifierService = notifierService;
        this.apiGatewayService = apiGatewayService;
        this.transloco = transloco;
        this.validationsService = validationsService;
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.client'),
                        rout_index0: '',
                        isActive0: true,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.registerClient'),
                        rout_index1: '/register',
                        isActive1: true,
                        img_index1: 'assets/icons/save.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    {
                        label_index3: null,
                        label_Detail_index3: null,
                    },
                    { label_index4: null, label_Detail_index4: null },
                    {
                        label_index5: null,
                        label_Detail_index5: null,
                    },
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
        this.status = true;
        this.detailsBreadObject = this.chooseBread('clientBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    onCancel() {
        this.close.emit('closeAndCreate');
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
            this.clientTemp.allowedAccountno = this.allowedAccountno;
            this.clientTemp.apikey = this.apikey;
            this.clientTemp.name = this.name;
            this.clientTemp.shenase = this.shenase;
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
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerClient(this.clientTemp)
                .subscribe((res) => {
                this._primengProgressBarService.hide();
                this.close.emit('closeAndCreate');
            }, (error) => {
                this._primengProgressBarService.hide();
            });
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
        else if (!this.apikey) {
            this.notifierService.showError({
                detail: 'لطفا کلید کلاینت را وارد کنید!',
                life: 3000,
            });
            return false;
        }
        else if (!this.digitalPublickey) {
            this.notifierService.showError({ detail: "لطفا کلید دیجیتال را وارد کنید!", life: 3000 });
            return false;
        }
        else if (!this.validationsService.isBasicRSAKeyValueStructure(this.digitalPublickey ? this.digitalPublickey.toString() : null)) {
            this.notifierService.showError({ detail: "لطفا کلید دیجیتال را به درستی وارد نمائید!", life: 3000 });
            return false;
        }
        else {
            return true;
        }
    }
};
__decorate([
    Output()
], ClientRegisterComponent.prototype, "close", void 0);
__decorate([
    Input()
], ClientRegisterComponent.prototype, "registerEndpoint", void 0);
ClientRegisterComponent = __decorate([
    Component({
        selector: 'app-client-register',
        templateUrl: './client-register.component.html',
        styleUrls: ['./client-register.component.scss'],
        standalone: true,
        imports: [
            FormsModule,
            InputText,
            KeyFilter,
            ButtonDirective,
            MatTooltip,
            TranslocoPipe,
            FileUpload,
            Dialog,
            Card,
            ToggleSwitch,
            BreadcrumbsComponent,
            Toast,
            Ripple,
        ],
    })
], ClientRegisterComponent);
export { ClientRegisterComponent };
