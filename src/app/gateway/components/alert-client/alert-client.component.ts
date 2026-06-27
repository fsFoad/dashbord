import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-alert-client',
    templateUrl: './alert-client.component.html',
    standalone: true,
    styleUrls: ['./alert-client.component.scss'],
    imports: [DevelopmentComponent, ButtonDirective, MatTooltip],
})
export class AlertClientComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }
    ngOnInit(): void {
        this.scrollTop();
    }
    BeforeButton() {
        this.router.navigate(['/main/home']);
        this.close.emit('close');
    }
}
