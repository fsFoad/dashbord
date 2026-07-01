import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { TimePipe } from '../../../shared/pipes/time.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { TranslocoPipe } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
let BillStoreCartableComponent = class BillStoreCartableComponent {
    route;
    router;
    _primengProgressBarService;
    messagesApiFacadeService;
    apiGatewayService;
    billCartableList = [];
    items = [];
    detailsBreadObject = [];
    tempbillCartable;
    nextBtnFlag = false;
    serviceLog = false;
    rows = 10;
    first = 0;
    pageno = 0;
    pagesize = 10;
    pageDescription = 'صفحه' + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 }, { name: 20, code: 20 },
        { name: 30, code: 30 }, { name: 40, code: 40 }, { name: 50, code: 50 }
    ];
    dataLog = null;
    close = new EventEmitter();
    constructor(route, router, _primengProgressBarService, messagesApiFacadeService, apiGatewayService) {
        this.route = route;
        this.router = router;
        this._primengProgressBarService = _primengProgressBarService;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.apiGatewayService = apiGatewayService;
    }
    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f);
            if (element)
                element.scrollIntoView(true);
        });
    }
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'billStore':
                return [
                    {
                        index: 0,
                        label_index0: "api-store",
                        img_index0: "assets/icons/api-store.png",
                        rout_index0: '/',
                        isActive0: false
                    },
                    {
                        index: 1,
                        label_index1: "کارتابل صورتحساب",
                        rout_index1: "",
                        isActive1: true,
                        img_index1: "assets/icons/cartable.png"
                    }, { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null }
                ];
            default:
                return null;
        }
    }
    showLogReport(tempbillCartable, actiontype) {
        console.log(tempbillCartable);
        debugger;
        this.messagesApiFacadeService.apistoreJwt().subscribe(response => {
            debugger;
            console.log(response);
            debugger;
            this.messagesApiFacadeService.integrationTransferlog(response.outputData, tempbillCartable.partyId, tempbillCartable.apigatewayModuleId, tempbillCartable.apiLogRequestId, tempbillCartable.shamsiYear, tempbillCartable.shamsiMonth, actiontype).subscribe(res => {
                debugger;
                console.log(res);
            });
        });
    }
    ngOnInit() {
        this.scrollTop();
        this.fetchBillCartable();
        this.items = [
            {
                items: [
                    {
                        label: 'دانلود ریزکارکرد',
                        icon: '',
                        command: () => {
                            this.showLogReport(this.tempbillCartable, 0);
                        },
                    },
                    /*     {
                             label: 'انتقال ریزکارکرد به بوم رسالت',
                             icon: '',
                             command: (): void => {
                                 this.showLogReport(this.tempbillCartable,1)
                             },

                         },*/
                ]
            },
            {
                separator: true
            },
            {
                items: [{
                        label: 'انصراف',
                    }]
            }
        ];
        this.detailsBreadObject = this.chooseBread('billStore');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
    }
    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }
    setRecord(bill) {
        this.tempbillCartable = bill;
    }
    nextPageStatement() {
        this.pageno += 1;
        this.pageDescription = 'صفحه' + ': ' + (this.pageno + 1);
        this.fetchBillCartable();
    }
    previousPageStatement() {
        this.pageno -= 1;
        this.pageDescription = 'صفحه' + ': ' + (this.pageno + 1);
        this.fetchBillCartable();
    }
    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription = 'صفحه' + ': ' + (1);
        //if()
        this.fetchBillCartable();
    }
    onClose(e) {
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('billStore');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        if (e == 'close') {
            this.serviceLog = false;
        }
    }
    fetchBillCartable() {
        debugger;
        this.billCartableList = [];
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.apistoreJwt().subscribe(response => {
            debugger;
            console.log(response);
            this.messagesApiFacadeService.apilogrequest(response.outputData, this.pageno, this.pagesize).subscribe(responseAll => {
                this._primengProgressBarService.hide();
                if (Array.isArray(responseAll.outputData)) {
                    this.billCartableList = responseAll.outputData;
                }
                else {
                    this.billCartableList.push(responseAll.outputData);
                }
                debugger;
                this.billCartableList.map(x => (x.status === 1 ? x.status = true : x.status = false));
                debugger;
                for (let k = 0; k < this.billCartableList.length; k++) {
                    this.billCartableList[k] = Object.assign(this.billCartableList[k], { row: (k + 1) });
                }
                console.log('billCartableList', this.billCartableList);
            }, error => {
                this._primengProgressBarService.hide();
            });
        });
    }
};
__decorate([
    Output()
], BillStoreCartableComponent.prototype, "close", void 0);
BillStoreCartableComponent = __decorate([
    Component({
        selector: 'app-bill-store-cartable',
        templateUrl: './bill-store-cartable.component.html',
        standalone: true,
        styleUrls: ['./bill-store-cartable.component.scss'],
        imports: [
            BreadcrumbsComponent,
            NgIf,
            TableModule,
            Tooltip,
            MoreChar19Pipe,
            TimePipe,
            NgStyle,
            StatusPipe,
            Menu,
            ButtonDirective,
            Ripple,
            TranslocoPipe,
            DropdownModule,
            FormsModule,
            Toast,
            NgClass,
        ],
    })
], BillStoreCartableComponent);
export { BillStoreCartableComponent };
