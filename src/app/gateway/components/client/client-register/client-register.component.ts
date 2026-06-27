import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {ToastService} from '../../../../shared/services/ToastService';
import {CommonValidationsService} from '../../../../shared/validators/common-validations.service';
import {EndpointDto} from '../../../models/endpoint.Dto';
import {ApiGatewayService} from '../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {KeyFilter} from 'primeng/keyfilter';
import {ButtonDirective} from 'primeng/button';
import {MatTooltip} from '@angular/material/tooltip';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {FileUpload} from 'primeng/fileupload';

import {Dialog} from 'primeng/dialog';
import {Card} from 'primeng/card';
import {ToggleSwitch} from "primeng/toggleswitch";
import {BreadcrumbsComponent} from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {Toast} from 'primeng/toast';
import {Ripple} from 'primeng/ripple';

@Component({
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
export class ClientRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() registerEndpoint: EndpointDto;
    apikey: string = null;
    name: string = null;
    shenase: string = null;
    mobileNo: string = null;
    publicKey: string | ArrayBuffer = null;
    digitalPublickey: string | ArrayBuffer = null;
    status: boolean = null;
    endpointID: number = null;
    organizationCode: string = null;
    allowedAccountno: number = null;
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
    message: string = null;
    approvalText: string = null;
    showDialog: boolean;
    showDialog2: boolean;
    showDialog3: boolean;
    stepUpload = false;
    selectedFile: any;
    fileContent: string | ArrayBuffer = '';
    detailsBreadObject:any[] = [];
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiFacadeService: ApiGatewayService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService,
        private transloco :TranslocoService,
        private validationsService: CommonValidationsService
    ) {}


    chooseBread(caseBase: string) {
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
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        this.status = true;
        this.detailsBreadObject = this.chooseBread('clientBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    onCancel() {
        this.close.emit('closeAndCreate');
    }

    generateApikey() {
        this.apikey = '';
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.randomapikey().subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.apikey = a;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
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
            } else {
                this.clientTemp.publicKey = null;
            }
            if (this.digitalPublickey !== null) {
                this.digitalPublickey = this.digitalPublickey.toString();
                this.clientTemp.digitalPublickey =
                    this.digitalPublickey.replace(/\n/g, '');
            } else {
                this.clientTemp.digitalPublickey = null;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerClient(this.clientTemp)
                .subscribe(
                    (res) => {
                        this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
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

    onSelectDigital(fileList: any): void {
        const file = fileList.currentFiles[0];
        const fileReader: FileReader = new FileReader();
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

    uploadHandler(event: any, fileUploaderRef: any) {
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

    validationClient(): boolean {
        if (!this.name) {
            this.notifierService.showError({
                detail: 'لطفا نام را وارد کنید!',
                life: 3000,
            });
            return false;
        }else if (!this.mobileNo) {
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
        } else if (!this.apikey) {
            this.notifierService.showError({
                detail: 'لطفا کلید کلاینت را وارد کنید!',
                life: 3000,
            });
            return false;
        }  else if (!this.digitalPublickey) {
            this.notifierService.showError({detail: "لطفا کلید دیجیتال را وارد کنید!", life: 3000});
            return false;
        }  else if (!this.validationsService.isBasicRSAKeyValueStructure(this.digitalPublickey?this.digitalPublickey.toString():null)) {
            this.notifierService.showError({detail: "لطفا کلید دیجیتال را به درستی وارد نمائید!", life: 3000});
            return false;
        } else {
            return true;
        }
    }
}
