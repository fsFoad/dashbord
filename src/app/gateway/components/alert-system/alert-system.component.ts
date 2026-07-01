import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { ButtonDirective } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { SelectModule } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { MorChar32Pipe } from '../../../shared/pipes/morChar32.pipe';
import { NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    RegisterRecipientsAlertsComponent
} from '../authorized-recipients-alerts/register-recipients-alerts/register-recipients-alerts.component';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ToggleSwitch } from 'primeng/toggleswitch';
@Component({
    selector: 'app-alert-system',
    templateUrl: './alert-system.component.html',
    standalone: true,
    styleUrls: ['./alert-system.component.scss'],
    imports: [ToggleSwitch, DevelopmentComponent, ButtonDirective, Tooltip, BreadcrumbsComponent, SelectModule, InputText, MorChar32Pipe, NgIf, PrimeTemplate, ReactiveFormsModule, RegisterRecipientsAlertsComponent, Ripple, TableModule, Toast, ToggleSwitch, Tooltip, TranslocoPipe, FormsModule],
})
export class AlertSystemComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    AlertSignal = signal<any[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);
    first: number = 0;
    rows: number = 10;
    pageno: number = 0;
    totalRecords: number = 0;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    paginationLabel = this.transloco.translate('label.pagination.table');
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private transloco: TranslocoService,
    ) {}
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }
    onStatusToggle(party: any): void {
        console.log('وضعیت تغییر کرد:', party.name, '→', party.status);

    }
    ngOnInit(): void {
        this.scrollTop();
    }
    BeforeButton() {
        // this.router.navigate(['/home']);
        this.close.emit('close');
    }
}
