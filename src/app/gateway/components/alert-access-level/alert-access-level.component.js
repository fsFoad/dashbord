import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { PickList } from 'primeng/picklist';
import { CommonModule } from '@angular/common';
import { ConfirmationService, PrimeTemplate } from 'primeng/api';
import { Button, ButtonDirective } from 'primeng/button';
import { TranslocoPipe } from '@ngneat/transloco';
import { Listbox } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import { Skeleton } from 'primeng/skeleton';
let AlertAccessLevelComponent = class AlertAccessLevelComponent {
    router;
    route;
    messagesApiFacadeService;
    transloco;
    notifierService;
    confirmationService;
    apiGatewayService;
    cdr;
    _primengProgressBarService;
    constructor(router, route, messagesApiFacadeService, transloco, notifierService, confirmationService, apiGatewayService, cdr, _primengProgressBarService) {
        this.router = router;
        this.route = route;
        this.messagesApiFacadeService = messagesApiFacadeService;
        this.transloco = transloco;
        this.notifierService = notifierService;
        this.confirmationService = confirmationService;
        this.apiGatewayService = apiGatewayService;
        this.cdr = cdr;
        this._primengProgressBarService = _primengProgressBarService;
        effect(() => {
            const data = this.registerSignal();
            if (data.length > 0) {
                this.messagesApiFacadeService.registerSectionReceiverEffect(data).subscribe({
                    next: () => {
                        debugger;
                        this.selectedReceivers = [];
                        this.selectedErrors = [];
                        /*  this.messagesApiFacadeService.getReceiver(0, 10000).subscribe({
                              next: (response) => {
                                  debugger;
                                  this.availableReceivers = [];
                                  this._primengProgressBarService.hide();
                                  this.availableReceivers = response.map(item => ({
                                      status: item.status,
                                      receiverid: item.receiverId ?? item.receiverid,
                                      sectionid: item.sectionid,
                                      name: item.name,
                                  }));
                                  this.availableReceivers = response;
                              },
                              error: (err) => {
                                  debugger;
                                  console.error('❌ خطا در درخواست API:', err);
                                  this.error.set('خطا در دریافت داده‌ها');
                                  this._primengProgressBarService.hide();
                              },
                          });*/
                        this.messagesApiFacadeService.getReceiver(0, 10000).subscribe({
                            next: (httpResponse) => {
                                debugger;
                                this._primengProgressBarService.hide();
                                this.loading?.set?.(false);
                                this.loadingValue = false;
                                this.totalRecords =
                                    Number(httpResponse.headers.get('totalitems')) || 0;
                                let data = [];
                                const body = httpResponse.body;
                                if (Array.isArray(body)) {
                                    data = body;
                                }
                                else if (body?.data && Array.isArray(body.data)) {
                                    data = body.data;
                                }
                                else {
                                    data = [];
                                }
                                this.availableReceivers = data.map(item => ({
                                    status: item.status === 1 || item.status === true,
                                    receiverid: item.receiverId ?? item.receiverid,
                                    receiverId: item.receiverId ?? item.receiverid, // برای یکدست شدن
                                    name: item.name,
                                    mobileNo: item.mobileNo ?? item.receiverMobileNo ?? item.mobile ?? item.phoneNo ?? '', // بسته به API
                                }));
                            },
                            error: (err) => {
                                debugger;
                                this._primengProgressBarService.hide();
                                this.loading?.set?.(false);
                                this.loadingValue = false;
                                console.error('❌ خطا در درخواست API:', err);
                                this.error.set('خطا در دریافت داده‌ها');
                            },
                        });
                        this.messagesApiFacadeService.getSection(0, 10000).subscribe({
                            next: (response) => {
                                debugger;
                                this.availableErrors = [];
                                this._primengProgressBarService.hide();
                                this.availableErrors = response.map(item => ({
                                    id: item.id,
                                    title: item.title,
                                }));
                                console.log(' this.availableErrors ', this.availableErrors);
                                this.alertSignal.set(response);
                            },
                            error: (err) => {
                                debugger;
                                console.error('❌ خطا در درخواست API:', err);
                                this.error.set('خطا در دریافت داده‌ها');
                                this.loading.set(false);
                                this.loadingValue = false;
                                this._primengProgressBarService.hide();
                            },
                        });
                        this.notifierService.showSuccess(this.transloco.translate('label.http.status.200'));
                        this.loadSectionReceiver();
                    },
                    error: (err) => {
                        this.loading.set(false);
                        this.loadingValue = false;
                    }
                });
            }
        });
    }
    treeData = signal([]);
    alertSignal = signal([]);
    registerSignal = signal([]);
    loading = signal(true);
    error = signal(null);
    selectedReceivers = [];
    selectedReceiver = null;
    selectedErrors = [];
    selectedError = null;
    availableReceivers = [];
    detailsBreadObject = [];
    availableErrors = [];
    selectedSourceItems = [];
    selectedTargetItems = [];
    products;
    loadingValue = true;
    paginationLabel = this.transloco.translate('label.pagination.table');
    totalRecords = 0;
    chooseBread(caseBase) {
        switch (caseBase) {
            case 'alertAccessLevel':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.alertAccessLevel'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/alertAccessLevel.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    get selectedSourceCount() {
        return this.selectedSourceItems.length;
    }
    get selectedTargetCount() {
        return this.selectedTargetItems.length;
    }
    toggleSelection(item, type) {
        const list = type === 'source' ? this.selectedSourceItems : this.selectedTargetItems;
        const index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        }
        else {
            list.push(item);
        }
    }
    isSelected(item, type) {
        const list = type === 'source' ? this.selectedSourceItems : this.selectedTargetItems;
        return list.includes(item);
    }
    /*   loadSectionReceiver() {
           debugger
           this.loading.set(true);
           this.loadingValue = true;
           this.treeData.set([]);
           debugger
           debugger
           debugger
           debugger
           this.messagesApiFacadeService.getSectionReceiver(0, 10000).subscribe({
               next: (response) => {
                   debugger
                   debugger
                   debugger
                   debugger
   
                   let data = response?.data ?? response ?? [];
   
                   if (!Array.isArray(data) || data.length === 0) {
                       this.loading.set(false);
                       this.loadingValue = false;
                       return;
                   }
                   const grouped: Grouped = data.reduce<Grouped>((acc, curr: any) => {
                       const receiverName = curr.receiverName || curr.name || 'نامشخص';
                       const receiverMobileNo = curr.receiverMobileNo || curr.mobileNo || '---';
                       const receiverId = curr.receiverId ?? '';
                       const sectionTitle = curr.sectionTitle || curr.title || '';
                       const sectionId = curr.sectionId ?? '';
                       const status = curr.status ?? 0;
                       const key = `${receiverName}-${receiverMobileNo}-${receiverId}`;
                       if (!acc[key]) {
                           acc[key] = {
                               receiverName,
                               receiverMobileNo,
                               receiverId,
                               sectionIdSet: new Set<string | number>(),
                               children: [],
                               hasActiveChild: false,
                           };
                       }
                       const child: TreeNode = {
                           data: {
                               receiverName,
                               receiverMobileNo,
                               sectionTitle,
                               sectionId,
                               receiverId,
                               status,
                               assignDate: curr.assignDate ?? '-',
                           },
                       };
   
                       acc[key].children.push(child);
   
                       if (sectionId && status === 1) {
                           acc[key].sectionIdSet.add(sectionId);
                           acc[key].hasActiveChild = true;
                       }
   
                       return acc;
                   }, {} as Grouped);
                   const filteredParents = Object.values(grouped).filter((group) => group.hasActiveChild);
                   const treeNodes: TreeNode[] = filteredParents.map((group: GroupBucket): TreeNode => {
                       const activeChildren = group.children.filter(
                           (child) => child.data?.status === 1,
                       );
                       return {
                           data: {
                               receiverName: group.receiverName,
                               receiverMobileNo: group.receiverMobileNo,
                               receiverId: group.receiverId,
                               sectionIds: Array.from(group.sectionIdSet),
                           },
                           children: activeChildren,
                       };
                   });
                   console.log('🌳 treeNodes (filtered by status=1):', treeNodes);
                   this.addRowNumbers(treeNodes);
                   this.treeData.set(treeNodes);
                   this.loading.set(false);
                   this.loadingValue = false;
               },
               error: (err) => {
                   this.loading.set(false);
                   this.loadingValue = false;
                   console.error('خطا در دریافت اطلاعات جدول');
                   console.error(err);
               },
           });
       }*/
    loadSectionReceiver() {
        this.loading.set(true);
        this.loadingValue = true;
        this.treeData.set([]);
        this.messagesApiFacadeService.getSectionReceiver(0, 10000).subscribe({
            next: (res) => {
                const body = res?.body ?? res;
                const data = Array.isArray(body) ? body : (Array.isArray(body?.data) ? body.data : []);
                if (!Array.isArray(data) || data.length === 0) {
                    this.loading.set(false);
                    this.loadingValue = false;
                    return;
                }
                // ✅ map برای گیرنده‌ها
                const receiverMap = new Map((this.availableReceivers ?? []).map((r) => [
                    Number(r.receiverId ?? r.receiverid),
                    r
                ]));
                // ✅ map برای آلارم‌ها
                const sectionMap = new Map((this.availableErrors ?? []).map((s) => [
                    Number(s.id),
                    s
                ]));
                // ✅ تزریق name/mobile/title به رکوردها
                const enriched = data.map((x) => {
                    const r = receiverMap.get(Number(x.receiverId));
                    const s = sectionMap.get(Number(x.sectionId));
                    return {
                        ...x,
                        receiverName: r?.name ?? 'نامشخص',
                        receiverMobileNo: r?.mobileNo ?? '---',
                        sectionTitle: s?.title ?? '',
                        assignDate: x.rdateShamsi ?? x.rdate ?? '-',
                    };
                });
                const grouped = enriched.reduce((acc, curr) => {
                    const receiverName = curr.receiverName;
                    const receiverMobileNo = curr.receiverMobileNo;
                    const receiverId = curr.receiverId ?? '';
                    const sectionTitle = curr.sectionTitle ?? '';
                    const sectionId = curr.sectionId ?? '';
                    const isActive = curr.status === 1 || curr.status === '1' || curr.status === true;
                    const key = `${receiverName}-${receiverMobileNo}-${receiverId}`;
                    if (!acc[key]) {
                        acc[key] = {
                            receiverName,
                            receiverMobileNo,
                            receiverId,
                            sectionIdSet: new Set(),
                            children: [],
                            hasActiveChild: false,
                        };
                    }
                    const child = {
                        data: {
                            receiverName,
                            receiverMobileNo,
                            sectionTitle,
                            sectionId,
                            receiverId,
                            status: isActive ? 1 : 0,
                            assignDate: curr.assignDate ?? '-',
                        },
                    };
                    acc[key].children.push(child);
                    if (sectionId && isActive) {
                        acc[key].sectionIdSet.add(sectionId);
                        acc[key].hasActiveChild = true;
                    }
                    return acc;
                }, {});
                const filteredParents = Object.values(grouped).filter(g => g.hasActiveChild);
                const treeNodes = filteredParents.map((group) => {
                    const activeChildren = group.children.filter(ch => ch.data?.status === 1);
                    return {
                        data: {
                            receiverName: group.receiverName,
                            receiverMobileNo: group.receiverMobileNo,
                            receiverId: group.receiverId,
                            sectionIds: Array.from(group.sectionIdSet),
                        },
                        children: activeChildren,
                    };
                });
                this.addRowNumbers(treeNodes);
                this.treeData.set(treeNodes);
                this.loading.set(false);
                this.loadingValue = false;
            },
            error: (err) => {
                this.loading.set(false);
                this.loadingValue = false;
                console.error('خطا در دریافت اطلاعات جدول', err);
            }
        });
    }
    findParentInTree(receiverId) {
        if (!receiverId)
            return null;
        return (this.treeData() ?? []).find((p) => p?.data?.receiverId === receiverId) ?? null;
    }
    normalizeNode(node) {
        const data = node?.data ?? node ?? {};
        return {
            raw: node,
            children: node?.children ?? [],
            receiverId: data?.receiverId ?? null,
            receiverName: data?.receiverName ?? '',
            sectionTitle: data?.sectionTitle ?? '',
            sectionId: data?.sectionId ?? null,
            sectionIds: Array.isArray(data?.sectionIds) ? data.sectionIds : [],
        };
    }
    deleteChild(node) {
        const n = this.normalizeNode(node);
        const isParentNode = !!(n.sectionIds && n.sectionIds.length > 0 && !n.sectionId);
        const isChildNode = !!n.sectionId;
        const message = isParentNode
            ? `آیا از حذف همه موارد "${n.receiverName}" مطمئن هستید؟`
            : `آیا از حذف "${n.sectionTitle ?? ''}" از "${n.receiverName}" مطمئن هستید؟`;
        this.confirmationService.confirm({
            message,
            header: 'تأیید حذف',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'بله',
            rejectLabel: 'خیر',
            acceptButtonStyleClass: 'p-button-success p-button confirm-accept',
            rejectButtonStyleClass: 'p-button-outlined p-button-danger confirm-reject',
            accept: () => {
                // ✅ حالت پرنت
                if (isParentNode) {
                    const receiverId = n.receiverId;
                    const children = n.children ?? [];
                    const sectionIds = n.sectionIds ?? [];
                    const deleteObservables = [];
                    (children.length ? children : sectionIds).forEach((child) => {
                        const sectionId = typeof child === 'object' ? child.data?.sectionId : child;
                        if (sectionId && receiverId) {
                            deleteObservables.push(this.deleteSectionReceiver(sectionId, receiverId));
                        }
                    });
                    if (deleteObservables.length > 0) {
                        forkJoin(deleteObservables).subscribe({
                            next: () => {
                                this.notifierService.showSuccess('حذف با موفقیت انجام شد.');
                                this.loadSectionReceiver();
                            },
                            error: () => this.notifierService.showError('خطا در حذف داده‌ها'),
                        });
                    }
                }
                else if (isChildNode) {
                    const sectionId = n.sectionId;
                    const receiverId = n.receiverId;
                    if (sectionId && receiverId) {
                        console.log('🔹 در حال حذف چایلد:', { sectionId, receiverId });
                        this.deleteSectionReceiver(sectionId, receiverId).subscribe({
                            next: () => {
                                this.notifierService.showSuccess('آیتم با موفقیت حذف شد.');
                                this.loadSectionReceiver();
                            },
                            error: () => this.notifierService.showError('خطا در حذف آیتم'),
                        });
                    }
                    else {
                        console.warn('⚠️ چایلد داده ناقص دارد:', n);
                    }
                }
                else {
                    console.warn('⚠️ نود نه پرنت است نه چایلد:', n);
                }
            },
        });
    }
    deleteSectionReceiver(sectionId, receiverId) {
        return this.messagesApiFacadeService.sectionReceiverStatusEffect(0, sectionId, receiverId).pipe(tap(() => {
            console.log(`✅ حذف شد: sectionId=${sectionId}, receiverId=${receiverId}`);
        }), catchError((err) => {
            console.error('❌ خطا در حذف:', err);
            this.notifierService.showError('خطا در حذف آیتم.');
            // اگر خطا داشتیم، باز هم stream را ادامه دهیم تا forkJoin متوقف نشود
            return of(null);
        }));
    }
    addRowNumbers(nodes) {
        nodes.forEach((parent, pIndex) => {
            parent.data.row = (pIndex + 1).toString();
            if (parent.children && parent.children.length > 0) {
                parent.children.forEach((child, cIndex) => {
                    child.data.row = `${parent.data.row}.${cIndex + 1}`;
                    if (child.children && child.children.length > 0) {
                        this.addChildRowNumbers(child.children, `${parent.data.row}.${cIndex + 1}`);
                    }
                });
            }
        });
    }
    addChildRowNumbers(children, prefix) {
        children.forEach((child, index) => {
            child.data.row = `${prefix}.${index + 1}`;
            if (child.children && child.children.length > 0) {
                this.addChildRowNumbers(child.children, child.data.row);
            }
        });
    }
    ngOnInit() {
        this.loading.set(true);
        this.loadingValue = true;
        this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
        this.detailsBreadObject = this.chooseBread('alertAccessLevel');
        this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        /*  this.messagesApiFacadeService.getReceiver(0, 10000).subscribe({
              next: (response) => {
                  debugger;
                  this.availableReceivers = [];
                  this._primengProgressBarService.hide();
                  this.availableReceivers = response.map(item => ({
                      status: item.status,
                      receiverid: item.receiverId ?? item.receiverid,
                      sectionid: item.sectionid,
                      name: item.name,
                  }));
                  this.availableReceivers = response;
              },
              error: (err) => {
                  debugger;
                  console.error('❌ خطا در درخواست API:', err);
                  this.error.set('خطا در دریافت داده‌ها');
                  this._primengProgressBarService.hide();
              },
          });*/
        this.messagesApiFacadeService.getReceiver(0, 10000).subscribe({
            next: (httpResponse) => {
                debugger;
                this._primengProgressBarService.hide();
                this.loading?.set?.(false);
                this.loadingValue = false;
                this.totalRecords =
                    Number(httpResponse.headers.get('totalitems')) || 0;
                let data = [];
                const body = httpResponse.body;
                if (Array.isArray(body)) {
                    data = body;
                }
                else if (body?.data && Array.isArray(body.data)) {
                    data = body.data;
                }
                else {
                    data = [];
                }
                this.availableReceivers = data.map(item => ({
                    status: item.status === 1 || item.status === true,
                    receiverid: item.receiverId ?? item.receiverid,
                    receiverId: item.receiverId ?? item.receiverid,
                    name: item.name,
                    mobileNo: item.mobileNo ?? item.receiverMobileNo ?? item.mobile ?? item.phoneNo ?? '',
                }));
            },
            error: (err) => {
                debugger;
                this._primengProgressBarService.hide();
                this.loading?.set?.(false);
                this.loadingValue = false;
                console.error('❌ خطا در درخواست API:', err);
                this.error.set('خطا در دریافت داده‌ها');
            },
        });
        this.messagesApiFacadeService.getSection(0, 10000).subscribe({
            next: (response) => {
                debugger;
                this.availableErrors = [];
                this._primengProgressBarService.hide();
                this.availableErrors = response.map(item => ({
                    id: item.id,
                    title: item.title,
                }));
                console.log(' this.availableErrors ', this.availableErrors);
                this.alertSignal.set(response ?? []);
            },
            error: (err) => {
                debugger;
                console.error('❌ خطا در درخواست API:', err);
                this.error.set('خطا در دریافت داده‌ها');
                this._primengProgressBarService.hide();
            },
        });
        this.loadSectionReceiver();
    }
    clearLists() {
        this.selectedReceivers = [];
        this.selectedErrors = [];
        /*        this.messagesApiFacadeService.getReceiver(0, 10000).subscribe({
                    next: (response) => {
                        debugger;
                        this.availableReceivers = [];
                        this._primengProgressBarService.hide();
                        this.loading.set(false);
                        this.loadingValue = false;
                        this.availableReceivers = response.map(item => ({
                            status: item.status,
                            receiverid: item.receiverId ?? item.receiverid,
                            sectionid: item.sectionid,
                            name: item.name,
                        }));
                        this.availableReceivers = response;
                    },
                    error: (err) => {
                        debugger;
                        console.error('❌ خطا در درخواست API:', err);
                        this.error.set('خطا در دریافت داده‌ها');
                        this.loading.set(false);
                        this.loadingValue = false;
                        this._primengProgressBarService.hide();
                    },
                });*/
        this.messagesApiFacadeService.getReceiver(0, 10000).subscribe({
            next: (httpResponse) => {
                debugger;
                this._primengProgressBarService.hide();
                this.loading?.set?.(false);
                this.loadingValue = false;
                this.totalRecords =
                    Number(httpResponse.headers.get('totalitems')) || 0;
                let data = [];
                const body = httpResponse.body;
                if (Array.isArray(body)) {
                    data = body;
                }
                else if (body?.data && Array.isArray(body.data)) {
                    data = body.data;
                }
                else {
                    data = [];
                }
                this.availableReceivers = data.map(item => ({
                    status: item.status === 1 || item.status === true,
                    receiverid: item.receiverId ?? item.receiverid,
                    receiverId: item.receiverId ?? item.receiverid,
                    name: item.name,
                    mobileNo: item.mobileNo ?? item.receiverMobileNo ?? item.mobile ?? item.phoneNo ?? '', // بسته به API
                }));
            },
            error: (err) => {
                debugger;
                this._primengProgressBarService.hide();
                this.loading?.set?.(false);
                this.loadingValue = false;
                console.error('❌ خطا در درخواست API:', err);
                this.error.set('خطا در دریافت داده‌ها');
            },
        });
        this.messagesApiFacadeService.getSection(0, 10000).subscribe({
            next: (response) => {
                debugger;
                this.availableErrors = [];
                this._primengProgressBarService.hide();
                this.availableErrors = response.map(item => ({
                    id: item.id,
                    title: item.title,
                }));
                console.log(' this.availableErrors ', this.availableErrors);
                this.alertSignal.set(response);
            },
            error: (err) => {
                debugger;
                console.error('❌ خطا در درخواست API:', err);
                this.error.set('خطا در دریافت داده‌ها');
                this.loading.set(false);
                this.loadingValue = false;
                this._primengProgressBarService.hide();
            },
        });
    }
    register() {
        debugger;
        if (!this.selectedReceivers?.length || !this.selectedErrors?.length) {
            this.notifierService.showError(this.transloco.translate('sectionReceive.message.sectionReceive'));
            return;
        }
        debugger;
        const result = [];
        this.selectedReceivers.forEach(receiver => {
            this.selectedErrors.forEach(error => {
                result.push({
                    receiverId: receiver.receiverId ?? receiver.receiverid,
                    sectionId: error.id,
                    status: 1,
                });
            });
        });
        this.registerSignal.set(result);
        this.selectedReceiver = null;
        this.selectedError = null;
    }
};
AlertAccessLevelComponent = __decorate([
    Component({
        selector: 'app-alert-access-level',
        changeDetection: ChangeDetectionStrategy.Default,
        imports: [
            PickList,
            CommonModule,
            PrimeTemplate,
            ButtonDirective,
            Listbox,
            TranslocoPipe,
            TableModule,
            TreeTableModule,
            Toast,
            Button,
            ConfirmDialog,
            BreadcrumbsComponent,
            MatTooltip,
            Skeleton,
        ],
        templateUrl: './alert-access-level.component.html',
        styleUrl: './alert-access-level.component.scss',
        providers: [ConfirmationService],
        standalone: true,
    })
], AlertAccessLevelComponent);
export { AlertAccessLevelComponent };
