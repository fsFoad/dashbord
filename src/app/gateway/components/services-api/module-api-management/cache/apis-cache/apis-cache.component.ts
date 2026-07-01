import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonDirective } from 'primeng/button';
import { NgClass, NgIf } from '@angular/common';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
// FUSEFS

// FUSEFS

// import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { Ripple } from 'primeng/ripple';
import { Tooltip } from 'primeng/tooltip';
import { StatusPipe } from '../../../../../../shared/pipes/status.pipe';
import { AsynchronousApiGatewayService } from '../../../../../services/asynchronous-api-gateway.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ToastService } from '../../../../../../shared/services/ToastService';

interface Item {
    name: string;
    code: string;
}

interface RowData {
    id: number;
    name: string;
    checked: boolean;
}

@Component({
    selector: 'app-apis-cache',
    imports: [
        SelectModule,
        TranslocoPipe,
        ReactiveFormsModule,
        TableModule,
        ReactiveFormsModule,
        TableModule,
        ButtonDirective,
        NgIf,
        Ripple,
        Tooltip,
        StatusPipe,
        NgClass,
    ],
    templateUrl: './apis-cache.component.html',
    standalone: true,
    styleUrl: './apis-cache.component.scss',
})
export class ApisCacheComponent implements OnInit,OnDestroy  {
    @Output() apiSelected = new EventEmitter<any[]>();
    @Input() inputApiCache;
    private destroy$ = new Subject<void>();
    private sub!: Subscription;
    tableVisible=true
    form!: FormGroup;
    isTableDisabled=false
    selectedItems: any[] = [];
    allSelectedApis: any[] = [];
    selectedGetApiList: any[] = [];
    selectedPostApiList: any[] = [];
    httpMethodeOptions = [
        { name: '-', code: null },
        { name: 'سرویس های Post', code: 1 },
        { name: 'سرویس های Get', code: 2 },
    ];
    apiList = [];
    filterApi = [];
    moduleId: number = null;
    pageno = 0;
    first = 0;
    rows = 10;
    totalRecords = 0;
    loading = false;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 5, code: 5 },
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    private subscriptions = new Subscription();

    constructor(
        private fb: FormBuilder,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private asynchronousApiGatewayService: AsynchronousApiGatewayService,
        private transloco: TranslocoService,
        // FUSEFS

        // private _primengProgressBarService: FuseLoadingService,
        private cdr: ChangeDetectorRef,
        private messagesApiFacadeService: MessagesApiFacadeService
    ) {
    }
    onSelectionChange(event: any) {
        debugger;
        const isEmpty = !event || event.length === 0;
        this.apiGatewayService.sendSelectionEmptyStatus(isEmpty);

        if (this.isTableDisabled) {
            setTimeout(() => {
                this.selectedItems = this.selectedItems?.length ? [...this.selectedItems] : [];
                this.form.get('selectedItems')?.setValue(this.selectedItems);
                const isEmpty = !this.selectedItems || this.selectedItems.length === 0;
                this.apiGatewayService.sendSelectionEmptyStatus(isEmpty);
            });
            return;
        }

        const currentPageIds = this.filterApi.map(x => x.apiId);
        this.allSelectedApis = this.allSelectedApis.filter(api => !currentPageIds.includes(api.apiId));
        this.allSelectedApis = [...this.allSelectedApis, ...event];
        this.selectedItems = [...event];
        this.form.get('selectedItems')?.setValue(this.selectedItems);
        const method = this.form.get('httpMethode')?.value;
        if (method === 1) {
            this.selectedPostApiList = [...this.allSelectedApis];
            this.apiSelected.emit(this.selectedPostApiList);
        } else if (method === 2) {
            this.selectedGetApiList = [...this.allSelectedApis];
            this.apiSelected.emit(this.selectedGetApiList);
        }

        const merged = [...this.selectedGetApiList, ...this.selectedPostApiList];
        const subscription = this.apiGatewayService.updateSelectedApis(merged);
        this.subscriptions.add(subscription);

    }
    validatorApisCacheUpdate(): boolean {
        if (!this.form.get('httpMethode')?.value) {
            this.notifierService.showError({
                detail: 'لطفا نوع سرویس را انتخاب نمائید!',
                life: 3000,
            });
            return false;
        } else if (!this.allSelectedApis || this.allSelectedApis.length === 0) {
            this.notifierService.showError({
                detail: 'لطفا حداقل یک سرویس را از لیست انتخاب نمائید!',
                life: 3000,
            });
            return false;
        }
        return true;
    }
    ngOnInit() {
        debugger
        this.form = this.fb.group({
            httpMethode: [null],
            selectedItems: [[]],
            pagesize: [{ value: 5, disabled: true }],
            pageno: [{ value: 0, disabled: false }]
        });
        this.form.reset()
        if (this.inputApiCache != undefined) {
            this.moduleId = this.inputApiCache.moduleId;
        }
        this.isTableDisabled=false;
        debugger
        const subscription1 =this.apiGatewayService.cacheListToUpdateData$.subscribe(data => {
            debugger
            if (data) {
                debugger
                debugger
                this.form.controls['httpMethode'].setValue(data.apiType);
                this.loading = true;
                const pagesize = this.form.get('pagesize')?.value || 5;
                const targetApiId = data.apiId;
                let currentPage = 0;
                const fetchUntilFound = () => {
                    debugger
                    this.messagesApiFacadeService.apicacheApiinfo(currentPage, pagesize, this.moduleId, data.apiType).subscribe(
                        (result: any[]) => {
                            this.form.disable();
                            debugger
                            debugger
                            debugger
                            this.isTableDisabled=true;
                            debugger
                            const pageData = Array.isArray(result) ? result : [result];

                            pageData.forEach((x, i) => {
                                x.apiStatus = x.apiStatus == 1;
                                x.row = (currentPage * pagesize) + i + 1;
                            });
                            const existingItem = pageData.find(item => item.apiId === targetApiId);
                            this.selectedItems = existingItem ? [existingItem] : [];
                            if (existingItem) {
                                this.apiList=[]
                                this.filterApi = pageData;
                                this.selectedItems = [existingItem];
                                this.form.get('selectedItems')?.setValue([existingItem]);
                                this.loading = false;
                                // FUSEFS

                                // this._primengProgressBarService.hide();
                                this.onSelectionChange(this.selectedItems);
                                console.log('this.apiList1',this.apiList);
                            } else if (pageData.length === pagesize) {
                                currentPage++;
                                fetchUntilFound();
                                debugger
                            } else {
                                this.loading = false;
                                // FUSEFS

                                // this._primengProgressBarService.hide();
                                console.warn("آیتم موردنظر پیدا نشد.");
                                console.log('this.apiList2',this.apiList);
                                debugger
                            }
                            // ✅ بعد از گرفتن this.filterApi، اینو اضافه کن:
                            this.selectedItems = this.filterApi.filter(api =>
                                this.allSelectedApis.some(sel => sel.apiId === api.apiId)
                            );
                            this.form.get('selectedItems')?.setValue(this.selectedItems);
                        },
                        (error) => {
                            debugger
                            this.loading = false;
                            // FUSEFS

                            // this._primengProgressBarService.hide();
                            console.error("خطا در دریافت اطلاعات", error);
                            console.log('this.apiList3',this.apiList);
                        }
                    );
                };
                debugger
                console.log('this.apiList4',this.apiList);
                fetchUntilFound();
            }
        });
        this.apiGatewayService.disableTable$
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
                debugger;
                this.form.controls['httpMethode'].enable();
                this.isTableDisabled = val;
                console.log('🔁 مقدار isTableDisabled:', val);
                console.log('🔁 مقدار selectionMode باید باشد:', this.isTableDisabled ? null : 'multiple');

                // ✅ همیشه جدول رو force render کن (چه true، چه false)
                this.tableVisible = false;
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.tableVisible = true;
                    this.cdr.detectChanges();
                }, 0);
            });
        const subscription2 = this.apiGatewayService.resetApisCache$.subscribe(() => this.resetAll());
        this.subscriptions.add(subscription1);
        this.subscriptions.add(subscription2);
        this.apiGatewayService.setValidatorFn(this.validatorApisCacheUpdate.bind(this));
    }
    resetAll(){
        this.selectedItems=[]
        this.apiList=[]
        this.filterApi=[]
        this.form.reset()
    }
    changeHttpMethode(e){
        debugger;
        if (e.value != undefined || e.value != null) {
            this.allSelectedApis = [];
            this.selectedItems = [];
            this.selectedGetApiList = [];
            this.selectedPostApiList = [];
            this.form.controls['pageno'].patchValue(0);
            this.form.controls['pagesize'].patchValue(5);
            this.updatePageDescription();
            this.search(e.value);
            this.asynchronousApiGatewayService.setApiType(e.value);
            const subscription4 = this.apiGatewayService.updateApprovalApiType(e.value);
            this.subscriptions.add(subscription4);
            this.form.get('selectedItems')?.setValue([]);
            this.apiGatewayService.setDisableTable(false);
        } else {
            this.filterApi = [];
            this.apiList = [];
        }
        debugger;
    }


    submitForm() {
        console.log(this.form.value);
    }


    updatePageDescription(): void {
        const pageno = this.form.get('pageno')?.value || 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (pageno + 1);
    }

    previousPageStatement(): void {
        const current = this.form.get('pageno')?.value || 0;
        if (current > 0) {
            this.form.get('pageno')?.setValue(current - 1);
            this.updatePageDescription();
            this.search(this.form.get('httpMethode').value)
        }
    }

    nextPageStatement(): void {
        const current = this.form.get('pageno')?.value || 0;
        this.form.get('pageno')?.setValue(current + 1);
        this.updatePageDescription();
        this.search(this.form.get('httpMethode').value)
    }
    search(apiType): void {
        debugger
        debugger
        // FUSEFS

        // this._primengProgressBarService.show();
        this.loading = true;
        const pageno = this.form.get('pageno')?.value || 0;
        const pagesize = this.form.get('pagesize')?.value || 5;
        this.messagesApiFacadeService.apicacheApiinfo(pageno, pagesize, this.moduleId,apiType ).subscribe(
            (a) => {
                debugger
                // FUSEFS

                // this._primengProgressBarService.hide();
                this.apiList = Array.isArray(a) ? a : [a];
                this.filterApi=this.apiList.filter(item =>{
                    debugger
                    return  item.apiType == apiType
                } )
                for (let u = 0; u < this.filterApi.length; u++) {
                    this.filterApi[u] = Object.assign(
                        this.filterApi[u],
                        { row: u + 1 },
                    );
                    debugger;
                }
                if (pageno > 1) {
                    for (let i = 0; i < this.filterApi.length; i++) {
                        this.filterApi[i] = { ...this.filterApi[i], row: i + (pageno * pagesize) + 1 };
                    }
                } else if (pageno === 1) {
                    for (let i = 0; i < this.filterApi.length; i++) {
                        this.filterApi[i] = { ...this.filterApi[i], row: i + pagesize + 1 };
                    }
                } else {
                    for (let i = 0; i < this.filterApi.length; i++) {
                        this.filterApi[i] = { ...this.filterApi[i], row: i + 1 };
                    }
                }
                this.loading = false;
                this.selectedItems = this.filterApi.filter(api =>
                    this.allSelectedApis.some(sel => sel.apiId === api.apiId)
                );
                this.form.get('selectedItems')?.setValue(this.selectedItems);
            },
            (error) => {
                debugger
                this.loading = false;
                // FUSEFS

                // this._primengProgressBarService.hide();
            });
    }
    ngOnDestroy(): void {
            this.subscriptions?this.subscriptions.unsubscribe():null;
    }
}
