import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { MatTooltip } from '@angular/material/tooltip';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-costs',
    templateUrl: './costs.component.html',
    standalone: true,
    styleUrls: ['./costs.component.scss'],
    imports: [DevelopmentComponent, MatTooltip, ButtonDirective],
})
export class CostsComponent implements OnInit {
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
