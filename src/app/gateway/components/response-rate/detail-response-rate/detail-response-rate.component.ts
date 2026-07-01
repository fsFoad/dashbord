import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessagesApiFacadeService} from '../../../services/messages-api-facade.service';
import {ApiGatewayService} from '../../../services/api-gateway.service';
import {ToastService} from '../../../../shared/services/ToastService';
// FUSEFS

// FUSEFS

// import {FuseLoadingService} from '../../../../../../@fuse/services/loading';
import {Constants} from '../../../../shared/constants/Constants';
import {BreadcrumbsComponent} from "../../../../shared/components/breadcrumbs/breadcrumbs.component";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";
import {Toast} from "primeng/toast";
import {TranslocoPipe} from "@jsverse/transloco";
import {FormsModule} from "@angular/forms";
import {SelectModule} from "primeng/select";
import {Tooltip} from "primeng/tooltip";
import {MorChar32Pipe} from "../../../../shared/pipes/morChar32.pipe";
import {TimePipe} from "../../../../shared/pipes/time.pipe";

@Component({
  selector: 'app-detail-response-rate',
  templateUrl: './detail-response-rate.component.html',
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        Toast,
        SelectModule,
        FormsModule,
        TableModule,
        Tooltip,
        MorChar32Pipe,
        TimePipe,
        ButtonDirective,
        Ripple,
        TranslocoPipe

    ],
  styleUrls: ['./detail-response-rate.component.scss']
})
export class DetailResponseRateComponent implements OnInit {
    @Input() inputDetails;
    @Output() close = new EventEmitter<string>();
    detailList=[]
    first = 0;
    rows = 10;
    pageno = 0
    totalRecords = 0
    pagesize = 10
    detailsBreadObject = []
    pageDescription = 'صفحه' + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        {name: 10, code: 10}, {name: 20, code: 20},
        {name: 30, code: 30}, {name: 40, code: 40}, {name: 50, code: 50}
    ];
    sorttype='1'
    sorttypeOption=Constants.sorttype
    nextBtnFlag = false
  constructor(
      private messagesApiFacadeService: MessagesApiFacadeService,
      private apiGatewayService: ApiGatewayService,
      private notifierService: ToastService,
      // FUSEFS

      // private progressBarService: FuseLoadingService,
  ) { }
    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription = 'صفحه' + ': ' + (this.pageno + 1);
        this.fetch();
    }
    chooseBread(caseBase: string) {
        debugger
        switch (caseBase) {
            case 'responsRate':
                debugger
                if (this.inputDetails != undefined && this.inputDetails != null) {
                    debugger
                    if (this.inputDetails.typeChart == '1') {
                        debugger
                        return [
                            {
                                index: 0,
                                label_index0: 'گزارشات',
                                img_index0: 'assets/icons/reports.png',
                                rout_index0: '/home',
                                isActive0: false,
                            },
                            {
                                index: 1, label_index1: "میزان پاسخ‌دهی", rout_index1: "", isActive1: false,
                                img_index1: "assets/icons/respons.png"
                            },
                            {
                                index: 2,
                                label_index2: "میزان پاسخ‌دهی در تاریخ",
                                rout_index2: "",
                                isActive2: true,
                                img_index2: "assets/icons/respons.png",
                                label_Detail_index2: '(' + this.castToDate(this.inputDetails.typeChart1Td) + ')'
                            },
                            {   index: 3,
                                label_index3: "جزئیات میزان پاسخ‌دهی",
                                rout_index3: "",
                                isActive3: true,
                                img_index3: "assets/icons/detail.png",
                                label_Detail_index3: null},
                            {label_index4: null, label_Detail_index4: null}, {
                                label_index5: null,
                                label_Detail_index5: null
                            },
                            {label_index6: null, label_Detail_index6: null}
                        ]
                    }
                    else if (this.inputDetails.typeChart == '2') {
                        debugger
                        return [
                            {
                                index: 0,
                                label_index0: 'گزارشات',
                                img_index0: 'assets/icons/reports.png',
                                rout_index0: '/home',
                                isActive0: false,
                            },
                            {
                                index: 1, label_index1: "میزان پاسخ‌دهی", rout_index1: "", isActive1: false,
                                img_index1: "assets/icons/respons.png"
                            },
                            {
                                index: 2,
                                label_index2: "میزان پاسخ‌دهی سرویس",
                                rout_index2: "",
                                isActive2: false,
                                img_index2: "assets/icons/respons.png",
                                label_Detail_index2: '(' + this.inputDetails.typeChart2Title + '-' + this.inputDetails.typeChart2Name + ')'
                            },
                            {  label_index3: "جزئیات میزان پاسخ‌دهی",
                                rout_index3: "",
                                isActive3: true,
                                img_index3: "assets/icons/detail.png",
                            },
                            {label_index4: null, label_Detail_index4: null}, {
                                label_index5: null,
                                label_Detail_index5: null
                            },
                            {label_index6: null, label_Detail_index6: null}
                        ]
                    }
                    debugger
                }

            default:
                return null
        }
    }
    previousPageStatement(): void {

        this.pageno -= 1;
        this.pageDescription = 'صفحه' + ': ' + (this.pageno + 1);
        this.fetch();

    }
    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription = 'صفحه' + ': ' + (1);
        this.fetch()
    }
  ngOnInit(): void {
      debugger
      this.detailsBreadObject = this.chooseBread('responsRate')
      this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
      console.log(this.inputDetails,'inputDetails');
      this.fetch();
  }
    BeforeButton() {
        this.close.emit('close');
    }
    changeSorttype(){
        this.pageno = 0
        this.pagesize = 10
        this.pageDescription = 'صفحه' + ': ' + (this.pageno + 1);
        this.fetch()
    }
    fetch(){
        if (this.sorttype){
            // FUSEFS

            // this.progressBarService.show();
            this.messagesApiFacadeService.responsedelayDetail(this.inputDetails.logDate,this.inputDetails.apiId,this.sorttype, this.pageno, this.pagesize).subscribe(w => {
                debugger
                this.detailList=w
                let startRow: number
                this.pageno != 0 ? startRow = ((this.pageno) * this.pagesize) : startRow = 0;
                this.detailList.map(x => (x.status === 1 ? x.status = true : x.status = false))
                if (this.pageno != 0 && this.pageno != 1) {
                    for (let u = 0; u < this.detailList.length; u++) {
                        this.detailList[u] = Object.assign(this.detailList[u], {row: (u + startRow + 1)})
                    }
                } else if (this.pageno == 1) {
                    for (let u = 0; u < this.detailList.length; u++) {
                        this.detailList[u] = Object.assign(this.detailList[u], {row: (u + this.pagesize + 1)})
                    }
                } else {
                    for (let u = 0; u < this.detailList.length; u++) {
                        this.detailList[u] = Object.assign(this.detailList[u], {row: (u + 1)})
                        debugger
                    }
                }
                // FUSEFS

                // this.progressBarService.hide();
            },error => {
                // FUSEFS

                // this.progressBarService.hide();
            })
        }else {

                this.notifierService.showError(
                    {detail: 'لطفا نوع مرتب سازی را وارد کنید!'},
                   );
                return false;
        }

    }
    castToDate(args) {
        if (args)
            if (args.toString().length === 8) {

                let tempArgs8: string;
                tempArgs8 = args.toString().slice(0, 4) + '/' + args.toString().slice(4, 6) + '/' + args.toString().slice(6, 8);
                return tempArgs8;
            } else if (args.toString().length >= 15 && args.toString().length <= 17) {
                let tempArgs17: string;
                tempArgs17 = args.toString().slice(0, 4) + '/' + args.toString().slice(4, 6) + '/' + args.toString().slice(6, 8)
                    + " " + args.toString().slice(8, 10) + ":" + args.toString().slice(10, 12) + ":" + args.toString().slice(12, 14) + ":" +
                    args.toString().slice(14, args.length);
                return tempArgs17;
            } else {
                return args;
            }
    }
}
