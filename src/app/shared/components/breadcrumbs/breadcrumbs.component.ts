import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { ApiGatewayService } from '../../../main/services/api-gateway.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { ThreeDotBreadcrumbPipe } from '../../pipes/threeDotBreadcrumb.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        ToastModule,
        NgForOf,
        NgIf,
        NgStyle,
        Tooltip,
        ThreeDotBreadcrumbPipe,
        MatTooltip,
        TranslocoPipe,
        ButtonDirective,
    ],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy, AfterViewInit {
    detailsBreadObject: BreadcrumbService[] = [];
    subscription: Subscription;

    constructor(
        private apiGatewayService: ApiGatewayService,
        private cd: ChangeDetectorRef) {

    }
    @Output() backClicked = new EventEmitter<void>();
    @Input() showBackButton: boolean = true;

    onBackClick() {
        this.backClicked.emit();
    }
    ngAfterViewInit() {
        this.subscription = this.apiGatewayService.currentApprovalStageDetailsBreadObject.subscribe(data => {

            this.detailsBreadObject = data;
            console.log(this.detailsBreadObject);
            this.cd.detectChanges();
        });
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
