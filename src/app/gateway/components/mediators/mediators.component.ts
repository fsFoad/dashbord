import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import moment from 'jalali-moment';
import { Tree } from 'primeng/tree';
import { ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FileUpload } from 'primeng/fileupload';
import { NgIf, NgStyle } from '@angular/common';
import { ContextMenu } from 'primeng/contextmenu';
import { Toast } from 'primeng/toast';
import { ButtonDirective } from 'primeng/button';
import { Listbox } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { ThreeDotDetailsPipe } from '../../../shared/pipes/threeDotDetails.pipe';
import { Dialog } from 'primeng/dialog';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { TableModule } from 'primeng/table';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { Textarea } from 'primeng/textarea';
import { OrganizationChart } from 'primeng/organizationchart';
import { xml2json } from 'xml-js';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

@Component({
    selector: 'app-mediators',
    templateUrl: './mediators.component.html',
    styleUrls: ['./mediators.component.scss'],
    standalone: true,
    providers: [MessageService, ToastService],
    imports: [
        BreadcrumbsComponent,
        Panel,
        FileUpload,
        Tree,
        NgStyle,
        ContextMenu,
        Toast,
        ButtonDirective,
        Listbox,
        FormsModule,
        InputText,
        Tooltip,
        ThreeDotDetailsPipe,
        Dialog,
        TranslocoPipe,
        TableModule,
        MoreChar19Pipe,
        Textarea,
        NgIf,
        OrganizationChart,
    ],
})

export class MediatorsComponent implements OnInit {
    @Input() inputListMedia;
    @Output() close = new EventEmitter<string>();
    @ViewChild('myTree') myTree: any;
    @ViewChild('cm') cm!: ContextMenu;
    files: TreeNode[];
    selectedFile: TreeNode;
    selectedFileTree2: TreeNode;
    selectedTree: TreeNode[];
    pathSelect;
    withJson = '20px';
    acceptDisable = true;
    itemsList = [];
    itemsListShow = [];
    objs;
    public orgObjs: any;
    btnNextFlag = true;
    SecondFlag = true;
    btnUploadFlag = false;
    showListFlag = false;
    flagDialog: boolean;
    flagAddAndDeletedNode: boolean;
    title;
    node: any;
    isApproval = 0;
    appDate = '14020101';
    rdate = '14020102';
    apiList;
    items;
    apiName;
    apiTitle;
    moduleTitle;
    detModuleTitle;
    detApiTitle;
    detApiName;
    widthModuleTitle;
    widthApiTitle;
    widthApiName;
    keyNode;
    valueNode;
    changeTypeId;
    itemList;
    status = true;
    selectedApi = false;
    detailsBreadObject = [];
    accessBase;
    moduleBase;
    clientBase;
    partyBase;
    clientName;
    partyTitle;
    apiiTitle;
    tempPath;
    xmlString;
    mediatorChangeObject = {
        id: null,
        nodeName: '',
        keyNode: '',
        valueNode: '',
        changeTypeId: null,
        schemaName: null,
        status: null,
    };
    data: TreeNode[] = [
        {
            label: 'مدیرعامل',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'علی محمدی', title: 'مدیرعامل' },
            children: [
                {
                    label: 'مدیر فنی',
                    type: 'person',
                    styleClass: 'p-person',
                    data: { name: 'مریم رضایی', title: 'مدیر فنی' },
                    children: [
                        {
                            label: 'برنامه‌نویس',
                            type: 'person',
                            styleClass: 'p-person',
                            data: { name: 'احمد جعفری', title: 'برنامه‌نویس' },
                        },
                    ],
                },
                {
                    label: 'مدیر فروش',
                    type: 'person',
                    styleClass: 'p-person',
                    data: { name: 'زهرا احمدی', title: 'مدیر فروش' },
                },
            ],
        },
    ];
    apiId;
    mediatorId = null;
    path = '';
    orgPath = '';
    first = 0;
    rows = 10;
    objSelected;
    copyObjSelected;
    selectedNode = '';
    private byRaw = new Map<string, AppTreeNode>();
    paginationLabel = this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private transloco: TranslocoService,
        private el: ElementRef,
        private notifierService: ToastService,
    ) {
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'mediatorXml':
                return [
                    {
                        index: 0,
                        label_index0: 'مدیاتور',
                        img_index0: 'assets/icons/mediatorXml.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'ثبت مدیاتور xml',
                        rout_index1: '/mediator',
                        isActive1: true,
                        img_index1: 'assets/icons/save.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                        label_Detail_index0: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 1,
                        label_index1: 'سرویس',
                        rout_index1: null,
                        isActive1: false,
                        img_index1: 'assets/icons/api.png',
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'مدیاتور',
                        rout_index2: null,
                        isActive2: false,
                        img_index2: 'assets/icons/mediators.png',
                        label_Detail_index2: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'ثبت مدیاتور xml',
                        rout_index3: '/mediator',
                        isActive3: true,
                        img_index3: 'assets/icons/save.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/client',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'سرویس',
                        rout_index1: null,
                        isActive1: false,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    {
                        index: 2,
                        label_index2: 'مدیاتور',
                        rout_index2: null,
                        isActive2: false,
                        img_index2: 'assets/icons/mediators.png',
                        label_Detail_index2: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'ثبت مدیاتور xml',
                        rout_index3: '/mediator',
                        isActive3: true,
                        img_index3: 'assets/icons/save.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: 'سرویس گیرندگان',
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'مدیاتور',
                        rout_index3: null,
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'ثبت مدیاتور xml',
                        rout_index4: '/mediator',
                        isActive4: true,
                        img_index4: 'assets/icons/save.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: 'سرویس گیرندگان',
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
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'مدیاتور',
                        rout_index4: null,
                        isActive4: false,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiiTitle + ')',
                    },
                    {
                        index: 5,
                        label_index5: 'ثبت مدیاتور xml',
                        rout_index5: '/mediator',
                        isActive5: true,
                        img_index5: 'assets/icons/save.png',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    onClose() {
        this.detailsBreadObject = this.chooseBread('mediatorXml');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject,
        );
        this.flagAddAndDeletedNode = false;
        this.mediatorChangeObject = {
            id: null,
            nodeName: '',
            keyNode: '',
            valueNode: '',
            changeTypeId: null,
            schemaName: null,
            status: null,
        };
        this.valueNode = '';
        this.keyNode = '';
        this.path = '';
        if (this.inputListMedia != undefined) {
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.partyTitle) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }

    private ensureIndex(): void {
        debugger
        this.buildIndex(this.files as AppTreeNode[]);
    }

    private buildIndex(nodes: AppTreeNode[] | undefined): void {
        debugger
        this.byRaw.clear();
        if (!nodes?.length) return;

        const stack: AppTreeNode[] = [...nodes];
        while (stack.length) {
            const n = stack.pop()!;
            if (n.key) this.byRaw.set(n.key, n);
            if (n.children?.length) stack.push(...(n.children as AppTreeNode[]));
        }
    }

    public getPath(select: AppTreeNode): string | null {
        const rawKey = select?.key?.toString?.() ?? '';
        if (!rawKey) return '*';

        const norm = (s: string) => s.replace(/\([^)]*\)/g, '');
        const parts = rawKey.split('/').filter(Boolean);
        if (!parts.length) return '*';
        const cleaned = parts.map(norm).filter(Boolean);
        if (cleaned.length === 0) return '*';
        return '/' + cleaned.join('/');
    }

    public registerNode(): void {
        if (!this.validationNode()) return;

        const selected = this.selectedFileTree2;
        if (!selected) {
            this.notifierService.showError({ detail: 'نود انتخاب نشده است!', life: 3000 });
            return;
        }

        const selectedPath = this.getPath(selected);
        if (!selectedPath || selectedPath === '*') {
            this.notifierService.showError({ detail: 'مسیر انتخاب‌شده معتبر نیست!', life: 3000 });
            return;
        }

        const keyNode = this.keyNode;
        const valueNode = this.valueNode;

        this.mediatorChangeObject = {
            id: (this.mediatorChangeObject.id ?? 0) + 1,
            nodeName: selected.label,
            keyNode,
            valueNode,
            changeTypeId: 1,
            status: 1,
            schemaName: selectedPath,
        };
        this.itemsListShow = [...this.itemsListShow, { name: `add node → ${keyNode}:${valueNode} → ${selectedPath}` }];
        this.itemsList = [...this.itemsList, { ...this.mediatorChangeObject }];
        const pathParts = selectedPath.replace(/^\//, '').split('/').filter(Boolean);
        try {
            const parentObj = pathParts.length ? this.getValueByPath(this.objs, pathParts) : this.objs;
            console.log('   ➕ registerNode → parentObj:', parentObj);

            if (Array.isArray(parentObj)) {
                parentObj.forEach(item => {
                    if (item && typeof item === 'object') (item as any)[keyNode] = valueNode;
                });
            } else if (parentObj && typeof parentObj === 'object') {
                (parentObj as any)[keyNode] = valueNode;
            } else {
                throw new Error('والد مقصد شیء/آرایه نیست.');
            }
            this.objs = JSON.parse(JSON.stringify(this.objs));
            this.refreshPreview();
            this.flagAddAndDeletedNode=false
        } catch (error) {
            console.error('❌ خطا در افزودن گره:', error);
            this.notifierService.showError({ detail: 'خطا در افزودن گره: مسیر معتبر نیست.', life: 3000 });
        }

        this.valueNode = '';
        this.keyNode = '';
        this.path = '';
    }

    normalizeTree(nodes: AppTreeNode[], parentPath: string = ''): void {
        if (!nodes) return;
        nodes.forEach(node => {
            node.dataPath = ((parentPath ? parentPath + '/' : '') + node.key)
                ?.replace(/^root\//, '')
                ?.replace(/\([^)]*\)/g, '');
            if (node.children) {
                this.normalizeTree(node.children as AppTreeNode[], node.dataPath);
            }
        });
    }

    private getValueByPath(obj: any, rawParts: string[]): any {
        console.group('🟢 getValueByPath called');
        console.log('   🔹 rawParts:', rawParts);
        console.log('   🔹 starting obj:', JSON.stringify(obj, null, 2));

        if (!rawParts.length) {
            console.groupEnd();
            return obj;
        }
        const rootKeys = Object.keys(this.objs || {});
        if (rootKeys.length && rawParts[0] !== rootKeys[0]) {
            console.warn(`⚠️ مسیر بدون روت بود → prepend root '${rootKeys[0]}'`);
            rawParts.unshift(rootKeys[0]);
        }
        console.log('   🔹 normalized parts:', rawParts);

        let acc: any = obj;

        for (let i = 0; i < rawParts.length; i++) {
            const p = rawParts[i];
            console.log(`➡️ Step ${i}: looking for '${p}' in`, acc);
            if (Array.isArray(acc)) {
                const idx = Number(p);
                if (Number.isInteger(idx) && idx >= 0 && idx < acc.length) {
                    acc = acc[idx];
                    console.log(`   ✅ Took array index [${idx}] →`, acc);
                    continue;
                }
                console.error(`❌ اندیس '${p}' برای آرایه معتبر نیست. کلیدهای مجاز: [0..${acc.length - 1}]`);
                console.groupEnd();
                throw new Error(`❌ اندیس '${p}' برای آرایه معتبر نیست.`);
            }
            if (acc && typeof acc === 'object') {
                if (p in acc) {
                    acc = acc[p];
                    console.log(`   ✅ Found key '${p}' →`, acc);
                    continue;
                }
                const short = p.includes(':') ? p.split(':')[1] : null;
                if (short && short in acc) {
                    console.log(`   ℹ️ fallback بدون namespace '${short}'`);
                    acc = acc[short];
                    continue;
                }

                console.error(`❌ قسمت '${p}' پیدا نشد. کلیدهای موجود:`, Object.keys(acc));
                console.groupEnd();
                throw new Error(`❌ قسمت '${p}' در مسیر وجود ندارد.`);
            }

            console.error(`❌ مسیر نامعتبر در '${p}' → acc دیگر object یا array نیست:`, acc);
            console.groupEnd();
            throw new Error(`❌ مسیر نامعتبر در '${p}'.`);
        }

        console.log('🟢 Final result:', acc);
        console.groupEnd();
        return acc;
    }

    deleteNode(selectedFileTree2: AppTreeNode) {
        console.log('🟠 deleteNode called for:', selectedFileTree2);

        if (!selectedFileTree2?.leaf) {
            this.notifierService.showError({ detail: '!امکان حذف این نود وجود ندارد', life: 3000 });
            return;
        }
        if (!this.deleteValidation()) return;
        const path = this.getLabelPath(selectedFileTree2) ?? '';
        const partsAll = path.replace(/^\//, '').split('/').filter(Boolean);

        console.log('   🔹 label path:', path);
        console.log('   🔹 partsAll:', partsAll);

        if (!partsAll.length) {
            this.notifierService.showError({ detail: 'مسیر نود معتبر نیست.', life: 3000 });
            return;
        }
        const lastSeg = partsAll[partsAll.length - 1];
        const propKey = lastSeg.replace(/\[(\d+)\]$/, '');
        const parentParts = partsAll.slice(0, -1);
        const nodeLabel = selectedFileTree2.label;
        this.itemsListShow = [...this.itemsListShow, { name: `del node → ${nodeLabel} → ${path}` }];

        this.mediatorChangeObject = {
            id: (this.mediatorChangeObject.id ?? 0) + 1,
            nodeName: nodeLabel,
            keyNode: propKey,
            valueNode: null,
            changeTypeId: 2,
            schemaName: path,
            status: 1,
        };
        this.itemsList = [...this.itemsList, { ...this.mediatorChangeObject }];

        try {
            const parentObj = parentParts.length ? this.getValueByPath(this.objs, parentParts) : this.objs;
            if (Array.isArray(parentObj)) {
                parentObj.forEach((it: any) => { if (it && typeof it === 'object') delete it[propKey]; });
            } else if (parentObj && typeof parentObj === 'object') {
                delete (parentObj as any)[propKey];
            } else {
                throw new Error('والد مقصد شیء/آرایه نیست.');
            }

            this.objs = JSON.parse(JSON.stringify(this.objs));
            this.refreshPreview();
        } catch (err) {
            console.error('❌ خطا در حذف کلید:', err);
            this.notifierService.showError({ detail: 'حذف گره با خطا مواجه شد.', life: 3000 });
        }
    }

    private refreshPreview(): void {
        console.log('🔄 refreshPreview() → rewriting objSelected from this.objs');

        if (this.pathSelect) {
            try {
                const parts = this.pathSelect.replace(/^\//, '').split('/').filter(Boolean);
                const selectedJson = this.getValueByPath(this.objs, parts);
                this.objSelected = this.prettyCode(selectedJson);
            } catch (e) {
                console.error("❌ refreshPreview failed to resolve pathSelect:", e);
                this.objSelected = this.prettyCode(this.objs);
            }
        } else {
            this.objSelected = this.prettyCode(this.objs);
        }

        this.copyObjSelected = this.objSelected;
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit() {
        this.items = [
            { label: 'افزودن نود به خروجی', icon: 'pi pi-plus', command: (event) => this.showAddKey() },
            {
                label: 'حذف نود از خروجی',
                icon: 'pi pi-trash',
                command: (event) => this.deleteNode(this.selectedFileTree2),
            },
        ];
        this.scrollTop();
        this.detailsBreadObject = this.chooseBread('mediatorXml');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject,
        );

        if (this.inputListMedia != undefined) {
            this.accessBase = this.inputListMedia.accessBase;
            this.moduleBase = this.inputListMedia.moduleBase;
            this.clientBase = this.inputListMedia.clientBase;
            this.partyTitle = this.inputListMedia.partyTitle;
            this.clientName = this.inputListMedia.clientName;
            this.moduleTitle = this.inputListMedia.moduleTitle;
            this.detModuleTitle = this.inputListMedia.moduleTitle;
            this.apiiTitle = this.inputListMedia.apiTitle;
            this.detApiTitle = this.inputListMedia.apiTitle;
            this.partyBase = this.inputListMedia.partyBase;
            this.apiId = this.inputListMedia.apiId;
            this.apiName = this.inputListMedia.apiName;
            this.detApiName = this.inputListMedia.apiName;

            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject,
                );
            }
            this.showListFlag = true;
        }
    }

    showAddValidation(): boolean {
        this.tempPath = this.getPath(this.selectedFileTree2);
        for (let i = 0; i < this.itemsList.length; i++) {
            if (
                this.itemsList[i].schemaName == this.tempPath &&
                this.itemsList[i].changeTypeId == 2
            ) {
                this.notifierService.showError({
                    detail: 'امکان افزودن نود برای نود حذف شده وجود ندارد!',
                    life: 3000,
                });
                return false;
            }
        }
        return true;
    }

    deleteValidation(): boolean {
        debugger
        this.tempPath = this.getPath(this.selectedFileTree2);
        if (this.itemsList.length != 0) {
            for (let i = 0; i < this.itemsList.length; i++) {
                if (
                    this.itemsList[i].schemaName == this.tempPath &&
                    this.itemsList[i].changeTypeId == 2
                ) {
                    this.notifierService.showError({
                        detail: '!این نود قبلا به لیست تغییرات افزوده شده است',
                        life: 3000,
                    });
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }

    showAddKey() {
        debugger
        if (!this.selectedFileTree2.leaf) {
            if (this.showAddValidation()) {
                debugger
                this.flagAddAndDeletedNode = true;
                this.tempPath = this.getPath(this.selectedFileTree2);
            }
        } else {
            this.notifierService.showError({
                detail: '!امکان افزودن به این نود وجود ندارد',
                life: 3000,
            });
        }
    }

    onNodeSelect(e: { node: AppTreeNode }): void {
        const n = e?.node;
        if (!n) return;

        if (n.leaf) {
            this.notifierService.showError({ detail: 'امکان انتخاب این نود وجود ندارد!', life: 3000 });
            this.selectedTree = null;
            this.selectedFile = null as any;
            return;
        }
        this.objs = JSON.parse(JSON.stringify(this.orgObjs));
        this.ensureIndex();
        this.selectedTree = [n];
        this.selectedFile = n;

        const path = this.getLabelPath(n);
        console.log('📍 Label Path:', path);

        if (!path || path === '*') {
            this.notifierService.showError({
                detail: 'گره انتخاب شده معتبر نیست!',
                life: 3000,
            });
            this.pathSelect = null;
            return;
        }

        this.pathSelect = path;
        this.acceptDisable = false;

        try {
            const parts = path.replace(/^\//, '').split('/').filter(Boolean);
            const selectedJson = this.getValueByPath(this.objs, parts);

            this.objSelected = this.prettyCode(selectedJson);
            this.copyObjSelected = JSON.parse(JSON.stringify(selectedJson));
            this.setObjSelectedFromCurrentSelection();

            console.log('🧩 selected JSON node:', selectedJson);
        } catch (err) {
            console.error('❌ نتوانستم زیرشاخه انتخابی را خروجی بگیرم:', err);
        }
    }

    private getLabelPath(node: AppTreeNode): string {
        const labels: string[] = [];
        let cur: AppTreeNode | undefined = node;
        while (cur) {
            if (cur.label && cur.label !== "?xml" && cur.label !== "#comment") {
                labels.unshift(cur.label);
            }
            cur = cur[parentSymbol];
        }
        return "/" + labels.join("/");
    }

    uploadFile2(event: any) {
        const file = event.files?.[0];
        if (!file) {
            this.notifierService.showError({ detail: '!هیچ فایلی انتخاب نشده است', life: 3000 });
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            try {
                this.xmlString = reader.result as string;
                const parsed = this.xmlToJson(this.xmlString);
                if (!parsed) throw new Error('xmlToJson هیچ خروجی برنگرداند!');
                this.objs = parsed;
                this.orgObjs = JSON.parse(JSON.stringify(parsed));
                this.files = Object.entries(parsed).map(([rootLabel, rootVal], idx) =>
                    this.jsonToTreeNodes(rootVal, rootLabel, '', 0, idx)
                );
                console.log('🌲 TREE ROOTS:', JSON.stringify(this.files, null, 2));
                this.itemsList = [];
                this.itemsListShow = [];
                this.refreshPreview();
                console.log('✅ فایل جدید بارگذاری شد:', this.objs);
            } catch (err) {
                console.error('❌ خطا در پردازش فایل XML:', err);
                this.notifierService.showError({
                    detail: '!فایل معتبر نیست یا پارس نشد',
                    life: 3000,
                });
            }
        };

        reader.readAsText(file);
    }

    private jsonToTreeNodes(
        input: any,
        label: string,
        parentPath: string,
        level: number,
        order: number,
        parent?: AppTreeNode
    ): AppTreeNode {
        const key = parentPath ? `${parentPath}/${label}` : label;
        if (input === null || typeof input !== "object") {
            return {
                key,
                label,
                data: String(input ?? "(empty)"),
                leaf: true,
                expanded: false,
                selectable: false,
                children: [],
                dataPath: key
            } as AppTreeNode;
        }
        if (Array.isArray(input)) {
            return {
                key,
                label,
                data: label,
                leaf: true,
                expanded: false,
                selectable: false,
                children: [],
                dataPath: key
            } as AppTreeNode;
        }
        const node: AppTreeNode = {
            key,
            label,
            data: label,
            expanded: true,
            children: [],
            dataPath: key
        };

        node.children = Object.entries(input).map(([childName, val], idx) => {
            const child = this.jsonToTreeNodes(val, childName, key, level + 1, idx, node);
            child[parentSymbol] = node;
            return child;
        });

        if (parent) {
            node[parentSymbol] = parent;
        }

        return node;
    }

    onRightClick(event: any) {
        this.selectedFileTree2 = event.node;
    }

    myUploader(event: any, fileUploaderRef: any): void {
        this.btnUploadFlag = false;
        fileUploaderRef.clear();
        fileUploaderRef.uploadedFileCount = 0;
    }

    confirmExit() {
        this.orgPath = this.getPath(this.selectedFile);
        this.appDate = '';
        this.rdate = '';
        this.btnNextFlag = false;
        this.isApproval = 1;
        const m = moment();
        const d = new Date();
        m.locale('fa');
        m.format('YY-MM-DD');
        let date;
        date = m.format('YYYYMMDDHHmmss');
        this.appDate = date + d.getMilliseconds();
        this.rdate = date + d.getMilliseconds();
        this.appDate = date;
        this.rdate = date;
        this.notifierService.showSuccess({
            detail: '!انجام شد json  تایید اولیه ',
            life: 3000,
        });
    }

    showSecond() {
        this.SecondFlag = false;
    }

    clearList() {
        this.itemsListShow = [];
        this.itemsList = [];
        this.flagAddAndDeletedNode = false;
        this.objs = JSON.parse(JSON.stringify(this.orgObjs));
        this.setObjSelectedFromCurrentSelection();
        console.log('🔄 clearList → objs reset to orgObjs & objSelected rebuilt from pathSelect:', this.pathSelect);
    }

    private setObjSelectedFromCurrentSelection(): void {
        if (!this.pathSelect) {
            this.objSelected = this.prettyCode(this.objs);
            this.copyObjSelected = this.objSelected;
            console.log('ℹ️ setObjSelectedFromCurrentSelection → no selection, showing whole objs');
            return;
        }

        try {
            const parts = this.pathSelect.replace(/^\//, '').split('/').filter(Boolean);
            const selectedJson = this.getValueByPath(this.objs, parts);
            this.objSelected = this.prettyCode(selectedJson);
            this.copyObjSelected = JSON.parse(JSON.stringify(selectedJson));
            console.log('✅ setObjSelectedFromCurrentSelection → refreshed from objs & pathSelect:', this.pathSelect);
        } catch (e) {
            console.error('❌ setObjSelectedFromCurrentSelection failed:', e);
            this.objSelected = this.prettyCode(this.objs);
            this.copyObjSelected = this.objSelected;
        }
    }

    showBack() {
        this.SecondFlag = true;
    }

    validation(): boolean {
        if (!this.title) {
            this.notifierService.showError({
                detail: 'لطفا عنوان مدیاتور را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.selectedApi && !this.showListFlag) {
            this.notifierService.showError({
                detail: 'لطفا Api  مدیاتور را انتخاب نمائید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationNode(): boolean {
        if (!this.keyNode) {
            this.notifierService.showError({
                detail: '!لطفا کلید را وارد نمائید',
                life: 3000,
            });
            return false;
        }
        this.tempPath = this.getPath(this.selectedFileTree2);
        if (this.itemsList.length != 0) {
            for (let i = 0; i < this.itemsList.length; i++) {
                if (
                    this.itemsList[i].schemaName == this.tempPath &&
                    this.itemsList[i].keyNode == this.keyNode
                ) {
                    this.notifierService.showError({
                        detail: '!این نود قبلا به لیست تغییرات افزوده شده است',
                        life: 3000,
                    });
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }

    registerFinal() {
        const registerObj = {
            apiId: null,
            isApproval: null,
            schemaName: '',
            title: '',
            appDate: '',
            rdate: '',
            status: null,
        };
        const registerChangeObj = {
            mediatorId: null,
            changeTypeId: null,
            nodeName: '',
            nodeValue: '',
            schemaName: '',
            status: 1,
        };
        if (this.validation()) {
            registerObj.apiId = this.apiId;
            if (this.selectedFile.label == 'Root') {
                registerObj.schemaName = '*';
            } else {
                registerObj.schemaName = this.orgPath;
            }
            registerObj.title = this.title;
            registerObj.isApproval = this.isApproval;
            registerObj.appDate = this.appDate;
            registerObj.rdate = this.rdate;
            registerObj.status = 1;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .mediatorRegister(registerObj)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.mediatorId = a.mediatorId;
                        this.itemsList.forEach((item) => {
                            registerChangeObj.mediatorId = this.mediatorId;
                            registerChangeObj.nodeName = item.keyNode;
                            registerChangeObj.nodeValue = item.valueNode;
                            registerChangeObj.changeTypeId = item.changeTypeId;
                            registerChangeObj.schemaName = item.schemaName;
                            registerChangeObj.status = 1;
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .mediatorchangeRegister(registerChangeObj)
                                .subscribe(
                                    (b) => {
                                        this._primengProgressBarService.hide();
                                        this.itemsListShow = [];
                                        this.itemsList = [];
                                        this.keyNode = '';
                                        this.changeTypeId = '';
                                        this.valueNode = '';
                                        this.mediatorId = '';
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    },
                                );
                        });
                        if (this.itemsList.length == 0) {
                            this.isApproval = null;
                            this.appDate = '';
                            this.rdate = '';
                        }
                        this.SecondFlag = true;
                        this.title = '';
                        this.detModuleTitle = '';
                        this.detApiTitle = '';
                        this.detApiName = '';
                        this.files = [];
                        this.selectedTree = [];
                        this.objSelected = '';
                        this.withJson = '20px';
                        this.pathSelect = '';
                        this.objSelected
                            ? (this.withJson = '247px')
                            : (this.withJson = '20px');
                        this.notifierService.showSuccess({
                            detail: 'ثبت نهایی مدیاتور باموفقیت انجام شد!',
                            life: 3000,
                        });
                        if (this.showListFlag) {
                            this.close.emit('close');
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );
        }
    }

    showSelectApi() {
        this.searchApi();
        this.flagDialog = true;
    }

    selectApi(api) {
        let listApiMediator;
        let countLicense = 0;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.mediatorFindByApiId(api.apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                listApiMediator = a;
                if (Array.isArray(a)) {
                    listApiMediator = a;
                } else {
                    listApiMediator.push(a);
                }
                listApiMediator.forEach((item) => {
                    if (item.status || item.status == 1) {
                        countLicense += 1;
                    }
                });
                if (countLicense == 0) {
                    this.selectedApi = true;
                    this.detModuleTitle = api.moduleTitle;
                    this.detApiTitle = api.apiTitle;
                    this.detApiName = api.apiName;
                    this.apiId = api.apiId;
                    this.detModuleTitle.length > 22
                        ? (this.widthModuleTitle = 100)
                        : (this.widthModuleTitle = 50);
                    this.detApiTitle.length > 22
                        ? (this.widthApiTitle = 100)
                        : (this.widthApiTitle = 50);
                    this.detApiName.length > 22
                        ? (this.widthApiName = 100)
                        : (this.widthApiName = 50);
                    this.flagDialog = false;
                } else {
                    this.notifierService.showError({
                        detail: 'یک مدیاتور فعال برای این api وجود دارد!',
                        life: 3000,
                    });
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );
    }

    onKeydown(event): void {
        const mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchApi();
        }
    }

    searchApi() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .apisearch(this.apiName, this.apiTitle, this.moduleTitle, '2')
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.apiList = a;
                    } else {
                        this.apiList.push(a);
                    }
                    for (let k = 0; k < this.apiList.length; k++) {
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            row: k + 1,
                        });
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
    }

    clearApi() {
        this.apiName = '';
        this.apiTitle = '';
        this.moduleTitle = '';
        this.searchApi();
    }

    private removeEmptyKeepTags(obj: any): any {
        if (Array.isArray(obj)) {
            return obj
                .map((v) => this.removeEmptyKeepTags(v))
                .filter((v) => v !== undefined);
        }

        if (obj && typeof obj === 'object') {
            const out: any = {};
            for (const [k, v] of Object.entries(obj)) {
                if (k === '?xml') continue;
                const val = this.removeEmptyKeepTags(v);
                if (k === '#text') {
                    if (val === '' || val === null || val === undefined) continue;
                    out[k] = val;
                    continue;
                }
                if (val === '' || val === null || val === undefined) {
                    out[k] = {};
                } else {
                    out[k] = val;
                }
            }
            return out;
        }
        if (obj === '' || obj === null || obj === undefined) {
            return {};
        }
        return obj;
    }

    xmlToJson(xmlString: string): any {
        try {
            if (!xmlString || typeof xmlString !== 'string' || xmlString.trim() === '') {
                this.notifierService.showError({
                    detail: '⛔ XML خالی یا نامعتبر است!',
                    life: 3000,
                });
                return null;
            }

            const validation = XMLValidator.validate(xmlString);
            if (validation !== true) {
                console.error('❌ خطای اعتبارسنجی XML:', validation.err);
                this.notifierService.showError({
                    detail: '!معتبر نیستXMLساختار  ',
                    life: 3000,
                });
                return null;
            }
            const parser = new XMLParser({
                ignoreAttributes: true,
                allowBooleanAttributes: true,
                trimValues: true,
                parseTagValue: true,
                parseAttributeValue: true,
                preserveOrder: false,
                alwaysCreateTextNode: false,
                removeNSPrefix: false,
            });

            let parsed = parser.parse(xmlString);
            console.log('🟢 RAW parsed:', JSON.stringify(parsed, null, 2));
            const cleaned = this.removeEmptyKeepTags(parsed);
            if (cleaned && typeof cleaned === 'object' && cleaned['?xml'] !== undefined) {
                delete cleaned['?xml'];
            }
            if (cleaned && typeof cleaned === 'object' && cleaned['?processing'] !== undefined) {
                delete cleaned['?processing'];
            }
            console.log('🧹 AFTER clean:', JSON.stringify(cleaned, null, 2));
            return cleaned;
        } catch (error) {
            console.error('❌ خطا در تبدیل XML به JSON:', error);
            return null;
        }
    }

    prettyCode(myObject: any): string {
        if (myObject === null || myObject === undefined) {
            return 'Object is null or undefined';
        }
        let jsonString: string;
        try {
            jsonString = typeof myObject === 'string'
                ? JSON.stringify(JSON.parse(myObject), null, 2)
                : JSON.stringify(myObject, null, 2);
        } catch (e) {
            jsonString = myObject.toString();
        }

        return jsonString;
    }
}

const parentSymbol = Symbol("parent");
export interface AppTreeNode extends TreeNode {
    dataPath?: string;
    normalizedKey?: string;
    [parentSymbol]?: AppTreeNode;
    pathLabel?: string;
}
