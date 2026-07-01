// @ts-nocheck
import {  Component, EventEmitter, OnInit, Output, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { TranslocoPipe } from '@ngneat/transloco';
import { MatTooltip } from '@angular/material/tooltip';
import { DevelopmentComponent } from '../../../shared/components/development/development.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: true,
    imports: [TranslocoPipe, DevelopmentComponent, MatTooltip, ButtonDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UsersComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }
    ngOnInit(): void {
        this.scrollTop();
    }
    BeforeButton() {
        this.router.navigate(['/main/home']);
        // this.close.emit('close');
    }
}
