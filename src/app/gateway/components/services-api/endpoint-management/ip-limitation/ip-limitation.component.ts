import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IplimitDto} from "../../../../models/Iplimit.Dto";

import {ActivatedRoute} from "@angular/router";
import {BreadcrumbsComponent} from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {Listbox} from 'primeng/listbox';
import {ToastService} from '../../../../../shared/services/ToastService';
import {FuseLoadingService} from '../../../../../../../@fuse/services/loading';
import {ApiGatewayService} from '../../../../services/api-gateway.service';
import {MessagesApiFacadeService} from '../../../../services/messages-api-facade.service';
import {CommonValidationsService} from '../../../../../shared/validators/common-validations.service';
import {Toast} from 'primeng/toast';
import { NgForOf } from '@angular/common';
import { Chip } from 'primeng/chip';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

@Component({
    selector: 'app-ip-limitation',
    templateUrl: './ip-limitation.component.html',
    styleUrls: ['./ip-limitation.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        FormsModule,
        ButtonDirective,
        InputText,
        TranslocoPipe,
        Toast,
        NgForOf,
        Chip,
        InputGroup,
        InputGroupAddon,
    ],
})
export class IpLimitationComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputIpLimit;
    ips: IpItem[] = [];
    addedIps: IpItem[] = [];
    ipAddress: IpItem[] = [];
    selectedIp;
    ip;
    flagList;
    iplimit: IplimitDto[] = [
        {
            endpointId: null,
            ipAddress: null,
        },
    ];
    detailsBreadObject = [];
    moduleTitle;
    destinationHost;
    partyTitle;
    clientName;
    partyBase;
    clientBase;
    accessBase;
    moduleBase;
    constructor(
        private route: ActivatedRoute,
        private notifierService: ToastService,
        private validationsService: CommonValidationsService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService
    ) {
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'moduleBase':
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
                        label_index1: 'ماژول',
                        rout_index1: '/api-gateway/home/party/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'اندپوینت',
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 3,
                        label_index3: 'ثبت محدودیت IP',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.destinationHost + ')',
                        img_index3: 'assets/icons/save.png',
                    },
                    {label_index4: null},
                    {label_index5: null},
                    {label_index6: null},
                ];
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
                        label_index1: 'سازمان',
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ماژول',
                        rout_index2: '/module',
                        isActive2: false,
                        img_index2: 'assets/icons/module.png',
                        label_Detail_index2: '(' + this.partyTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'اندپوینت',
                        rout_index3: './endpoint',
                        isActive3: false,
                        img_index3: 'assets/icons/endpoint.png',
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'ثبت محدودیت IP',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.destinationHost + ')',
                        img_index4: 'assets/icons/save.png',
                    },
                    {label_index5: null},
                    {label_index6: null},
                ];
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                    },

                    {
                        index: 1,
                        label_index1: 'اندپوینت',
                        rout_index1: '',
                        isActive1: false,
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                        img_index1: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ثبت محدودیت IP',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.destinationHost + ')',
                        img_index2: 'assets/icons/save.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
                ];
            case 'clientBase':
                return [

                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'اندپوینت',
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    {
                        index: 3,
                        label_index3: 'ثبت محدودیت IP',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.destinationHost + ')',
                        img_index3: 'assets/icons/save.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
                ];
            default:
                return null;
        }
    }
    onKeydown(event): void {
        debugger
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.addList();
        }
    }
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit() {
        debugger
        console.log('🚀 START ngOnInit');
        this.scrollTop();

        if (this.inputIpLimit) {
            debugger
            console.log('📥 inputIpLimit=', this.inputIpLimit);

            this.moduleTitle = this.inputIpLimit.moduleTitle;
            this.destinationHost = this.inputIpLimit.destinationHost;
            this.partyTitle = this.inputIpLimit.partyTitle;
            this.clientName = this.inputIpLimit.clientName;
            this.partyBase = this.inputIpLimit.partyBase;
            this.clientBase = this.inputIpLimit.clientBase;
            this.accessBase = this.inputIpLimit.accessBase;
            this.moduleBase = this.inputIpLimit.moduleBase;

            if (this.inputIpLimit.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
            } else if (this.inputIpLimit.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
            } else if (this.inputIpLimit.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
            } else if (this.inputIpLimit.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
            }

            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }

        this.flagList = true;
        console.log('📌 flagList set to', this.flagList);
        if (Array.isArray(this.inputIpLimit?.ipLimitList)) {
            console.log('📥 inputIpLimit.ipLimitList=', this.inputIpLimit.ipLimitList);

            this.ipAddress = this.inputIpLimit.ipLimitList.map((item: any) => ({
                name: item.ipAddress,
                limitId: item.limitId ?? null,
                endpointId: item.endpointId ?? this.inputIpLimit.endpointId ?? null
            }));

            this.ips = [...this.ipAddress];
            this.addedIps = [...this.ipAddress];

            console.log('📌 final ipAddress=', this.ipAddress);
            console.log('📌 ips=', this.ips);
            console.log('📌 addedIps=', this.addedIps);
        } else {
            console.error('❌ ipLimitList وجود ندارد یا از نوع Array نیست.');
        }
    /*    if (Array.isArray(this.inputIpLimit?.ipLimitList)) {
            debugger
            debugger
            if (this.inputIpLimit.ipLimitList.length > 0) {
                console.log('📥 inputIpLimit.ipLimitList=', this.inputIpLimit.ipLimitList);

                this.ipAddress = this.inputIpLimit.ipLimitList.map((item: any) => ({
                    name: item.ipAddress,
                    limitId: item.limitId ?? null,
                    endpointId: item.endpointId ?? this.inputIpLimit.endpointId ?? null
                }));

                this.ips = [...this.ipAddress];
                this.addedIps = [...this.ipAddress];
            }
            else {
                console.warn('⚠️ ipLimitList خالی است! باید پدر این را پر کند.');
            }
        } else {
            console.error('❌ ipLimitList وجود ندارد یا از نوع Array نیست.');
        }*/
    }

    onCancel() {
        this.close.emit('close');
    }

   /* createObjectIpsByEndpointId() {
        this.iplimit = [];
        for (let i = 0; i < this.ips.length; i++) {
            const iplimitObj = {
                endpointId: null,
                ipAddress: null,
            };
            iplimitObj.endpointId = this.inputIpLimit.endpointId;
            iplimitObj.ipAddress = this.ips[i].name;
            this.iplimit.push(iplimitObj);
        }
        return this.iplimit;
    }*/
   /* createObjectIpsByEndpointId() {
        this.iplimit = [];
        for (let i = 0; i < this.addedIps.length; i++) {
            this.iplimit.push({
                endpointId: this.inputIpLimit.endpointId,
                ipAddress: this.addedIps[i],
            });
        }
        console.log('📌 createObjectIpsByEndpointId ->', this.iplimit);
        return this.iplimit;
    }*/
    createObjectIpsByEndpointId() {
        this.iplimit = this.addedIps.map(x => ({
            endpointId: this.inputIpLimit.endpointId,
            ipAddress: x.name,
            limitId: x.limitId ?? null
        }));

        console.log('📌 createObjectIpsByEndpointId ->', this.iplimit);
        return this.iplimit;
    }




    addSemicolon(iplimit: IplimitDto[]) {
        const joined = iplimit.map(x => x.ipAddress).join(';');
        console.log('📌 addSemicolon -> joined=', joined);
        return joined;
    }



    /* addSemicolon(iplimit) {
         let result = '';
         for (let i = 0; i < iplimit.length; i++) {
             result += iplimit[i].ipAddress.toString();
             if (i < iplimit.length - 1) {
                 result += ';';
             }
         }
         return result;
     }*/

   /* onRegister() {
        this.iplimit = this.createObjectIpsByEndpointId();
        const result = this.addSemicolon(this.iplimit);
        const iplimitObj = {
            endpointId: null,
            ipAddress: null,
        };
        iplimitObj.endpointId = this.inputIpLimit.endpointId.toString();
        iplimitObj.ipAddress = result;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.registerIplimit(iplimitObj).subscribe(
            (resp) => {
                this._primengProgressBarService.hide();
                this.close.emit('close');
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }*/
   /* onRegister() {
        console.log('🚀 START onRegister');

        // حذف آی‌پی‌های تکراری
        this.addedIps = Array.from(new Map(this.addedIps.map(x => [x.name, x])).values());
        this.ips = [...this.addedIps];

        this.iplimit = this.createObjectIpsByEndpointId();

        // اینجا دیگه join نکن
        const iplimitObj = this.iplimit;

        console.log('📤 iplimitObj برای API:', iplimitObj);

        this._primengProgressBarService.show();
        this.messagesApiFacadeService.registerIplimit(iplimitObj).subscribe({
            next: () => {
                console.log('✅ ثبت موفق');
                this._primengProgressBarService.hide();
                this.close.emit('close');
            },
            error: (err) => {
                console.error('❌ خطا در ثبت', err);
                this._primengProgressBarService.hide();
            }
        });
    }*/
    onRegister() {
        debugger
        debugger
        console.log('🚀 START onRegister');

        this.addedIps = Array.from(new Map(this.addedIps.map(x => [x.name, x])).values());
        this.ips = [...this.addedIps];

        this.iplimit = this.createObjectIpsByEndpointId();

        if (!this.iplimit.length) {
            this.inputIpLimit.endpointId
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerIpLimit(this.inputIpLimit.endpointId,[]).subscribe(s=>{
                this._primengProgressBarService.hide();
                this.close.emit('close');
                this.notifierService.showSuccess({
                    detail: 'عملیات با موفقیت انجام گردید!',
                    life: 3000,
                });
            })
        }else {
            let completed = 0;
            const iplimitDtoArray: IplimitDto[] = this.iplimit.map(ipItem => ({
                endpointId: ipItem.endpointId ?? this.inputIpLimit.endpointId ?? 0,
                ipAddress: ipItem.ipAddress,
                ...(ipItem.limitId != null ? { limitId: ipItem.limitId } : {})
            }));

                debugger
                debugger
                console.log('📤 ارسال آیتم برای API:', iplimitDtoArray);
                debugger
                this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerIpLimit(this.inputIpLimit.endpointId,iplimitDtoArray).subscribe({
                next: () => {
                    this.notifierService.showSuccess({
                        detail: 'عملیات با موفقیت انجام گردید!',
                        life: 3000,
                    });
                    this._primengProgressBarService.hide();
                    this.close.emit('close');

                },
                error: (err) => {
                    console.error('❌ خطا در ثبت آی‌پی:', iplimitDtoArray, err);
                    completed++;
                    if (completed === this.iplimit.length) {
                        this._primengProgressBarService.hide();
                    }
                }
            });
        }




    }


    /*   addList() {
           if (this.ipValidate()) this.ips = [...this.ips, {name: this.ip}];
       }

       remove() {
           const itemIndex = this.ips.indexOf(this.selectedIp);
           const temp = this.ips;
           this.ips = [...temp];
           this.ips.splice(itemIndex, 1);
       }*/
    addList() {
        const candidate = (this.ip || '').trim();
        if (!candidate) return;
        if (!this.ipValidate()) return;

        if (this.addedIps.length >= 10) {
            this.notifierService.showError({
                detail: 'حداکثر ۱۰ IP می‌توانید ثبت کنید.',
                life: 2500
            });
            return;
        }

        if (this.addedIps.some(x => x.name === candidate)) {
            this.notifierService.showError({
                detail: `IP ${candidate} قبلاً اضافه شده است.`,
                life: 2500
            });
            return;
        }

        const newIp: IpItem = { name: candidate, limitId: null };
        this.addedIps = [...this.addedIps, newIp];
        this.ips = [...this.ips, newIp];

        console.log('🟢 addList -> addedIps=', this.addedIps);
        this.ip = '';
    }

    remove() {
        const itemIndex = this.ips.indexOf(this.selectedIp);
        if (itemIndex < 0) return;

        const name = this.ips[itemIndex]?.name;
        this.ips = this.ips.filter((_, i) => i !== itemIndex);
        this.addedIps = this.addedIps.filter(x => x.name !== name);
    }

    removeChip(index: number) {
        const name = this.addedIps[index].name;
        console.log('🔴 removeChip before:', this.addedIps);

        this.addedIps.splice(index, 1);
        this.addedIps = [...this.addedIps];
        this.ips = this.ips.filter(x => x.name !== name);

        console.log('🟢 removeChip after:', this.addedIps);
    }


    ipValidate(): boolean {
        if (this.validationsService.invalidIp(this.ip)) {
            this.notifierService.showError({
                detail: 'لطفا Ip را به درستی وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}

interface IpItem {
    name: string;
    limitId: number | null;
    endpointId?: number ;
}
